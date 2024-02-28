import prisma from '$lib/prisma.js';
import delay from '$utils/delay';
import { error, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
	name: z
		.string()
		.min(5, 'Name must be at least 5 characters')
		.max(100, 'Name must be no longer than 100 characters'),
	description: z
		.string()
		.min(5, 'Description must be at least 5 characters')
		.max(10000, 'Description must be no longer than 10000 characters'),
	price: z
		.number({
			required_error: 'Price is required'
		})
		.min(3, 'Please enter minimum of 3 digits')
		.default(999),
	imageUrl: z.string().url('Please enter a valid url').default('https://www.example.com')
});

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

	const form = await superValidate(experience, zod(schema));

	return {
		form
	};
};

export const actions = {
	update: async ({ request, params }) => {
		const form = await superValidate(request, zod(schema));

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

		return message(form, 'Experience updated');
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
