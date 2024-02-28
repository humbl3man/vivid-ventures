import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
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

export const load = async () => {
	const form = await superValidate(zod(schema));
	return {
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return {
				form
			};
		}

		const newExperience = await prisma.experience.create({
			data: {
				name: form.data.name,
				description: form.data.description,
				price: form.data.price,
				imageUrl: form.data.imageUrl
			}
		});

		redirect(302, '/admin/experience/' + newExperience.id);
	}
};
