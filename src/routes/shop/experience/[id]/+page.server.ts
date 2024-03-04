import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load = async ({ request, params }) => {
	const experienceFound = await prisma.experience.findUnique({
		where: {
			id: Number(params.id)
		},
		select: {
			name: true,
			description: true,
			imageUrl: true,
			price: true
		}
	});

	if (!experienceFound) {
		error(404, {
			message: 'Experience not found'
		});
	}

	return {
		experience: experienceFound
	};
};
