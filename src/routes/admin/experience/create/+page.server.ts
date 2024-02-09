import prisma from '$lib/prisma.js';
import { error } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const price = Number(formData.get('price')) ?? 0;
		const imageUrl = formData.get('imageUrl') as string;

		if (!name || !description || !price || !imageUrl) {
			error(401, {
				message: 'Please provide required information'
			});
		}

		await prisma.experience.create({
			data: {
				name,
				description,
				price,
				imageUrl
			}
		});
	}
};
