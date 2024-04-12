import prisma from '$lib/prisma.js';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const experiences = await prisma.experience.findMany({
		orderBy: {
			id: 'asc'
		}
	});
	const users = await prisma.user.findMany();

	return {
		experiences,
		users
	};
};

export const actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const userIdToDelete = formData.get('user_id') as string;

		if (userIdToDelete) {
			await prisma.user.delete({
				where: {
					id: userIdToDelete
				}
			});
		}

		redirect(303, '/admin');
	}
};
