import { lucia } from '$lib/auth';
import prisma from '$lib/prisma.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from './schema';

export const load = async (event) => {
	if (event.locals.user) {
		redirect(302, '/');
	}

	const form = await superValidate(zod(loginSchema));
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const existingUser = await prisma.user.findUnique({
				where: {
					username: form.data.username
				}
			});

			if (!existingUser) {
				return message(form, 'Invalid username or password. Please try again');
			}

			const validPassword = await new Argon2id().verify(
				existingUser.hashed_password,
				form.data.password
			);

			if (!validPassword) {
				return message(form, 'Invalid username or password. Please try again');
			}

			const session = await lucia.createSession(existingUser.id, {});
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
