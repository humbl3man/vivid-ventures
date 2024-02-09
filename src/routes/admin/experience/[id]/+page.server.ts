import prisma from '$lib/prisma.js';
import { error } from '@sveltejs/kit';

export const load = async ({ request, params }) => {
	console.log('Edit experience', params);
	const experienceId = +params.id;

	const experienceData = await prisma.experience.findUnique({
		where: {
			id: experienceId
		}
	});

	if (!experienceData) {
		error(404, {
			message: 'Experience not found'
		});
	}

	return {
		experienceData
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const price = Number(formData.get('price')) ?? 0;
		const imageUrl = formData.get('imageUrl') as string;

		if (!name || !description || !price || !imageUrl) {
			error(401, {
				message: 'Please provide required information'
			});
		}

		await prisma.experience.update({
			where: {
				id
			},
			data: {
				name,
				description,
				price,
				imageUrl
			}
		});
	}
};
