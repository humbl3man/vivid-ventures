import prisma from '$lib/prisma.js';
import { error, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { experienceSchema } from '../schema';

export const load = async ({ params }) => {
	const experience = await prisma.experience.findUnique({
		where: {
			id: Number(params.id)
		}
	});

	if (!experience) {
		error(404, {
			message: 'Experience not found'
		});
	}

	const form = await superValidate(experience, zod(experienceSchema), {
		id: 'createForm'
	});

	return {
		form
	};
};

export const actions = {
	update: async ({ request, params }) => {
		const form = await superValidate(request, zod(experienceSchema));

		if (!form.valid) {
			return {
				form
			};
		}

		await prisma.experience.update({
			where: {
				id: Number(params.id)
			},
			data: {
				name: form.data.name,
				description: form.data.description,
				price: form.data.price,
				imageUrl: form.data.imageUrl
			}
		});

		return message(form, 'Successfuly updated');
	},
	delete: async ({ params }) => {
		await prisma.experience.delete({
			where: {
				id: Number(params.id)
			}
		});

		redirect(302, '/admin');
	}
};
