import { lucia } from '$lib/auth';
import prisma from '$lib/prisma.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const schema = z.object({
	username: z
		.string()
		.min(3, 'Invalid username')
		.max(31, 'Invalid username')
		.regex(/^[a-z0-9_-]+$/, 'Invalid username'),
	password: z.string().min(6, 'Invalid password').max(255, 'Invalid password')
});

export const load = async (event) => {
	// if user is already logged in, redirect to user dashboard
	if (event.locals.user) {
		redirect(302, '/dashboard');
	}

	const form = await superValidate(zod(schema));
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const usernameExists = await prisma.user.findUnique({
				where: {
					username: form.data.username
				}
			});

			if (usernameExists) {
				return message(form, 'Invalid username or password. Please try again');
			}

			const userId = generateId(15);
			const hashedPassword = await new Argon2id().hash(form.data.password);

			await prisma.user.create({
				data: {
					id: userId,
					username: form.data.username,
					name: form.data.username,
					hashed_password: hashedPassword,
					cart: {
						create: {}
					}
				}
			});

			// create session and cookie for auth
			const session = await lucia.createSession(userId, {});
			const sessionCookie = await lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch (err) {
			return error(401, {
				message: 'Something went wrong'
			});
		}

		redirect(302, '/');
	}
};
