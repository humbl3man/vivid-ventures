import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { experienceSchema } from '../schema';

export const load = async () => {
	const form = await superValidate(zod(experienceSchema));
	return {
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(experienceSchema));

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
