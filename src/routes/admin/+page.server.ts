import { invalidateAll } from '$app/navigation';
import prisma from '$lib/prisma.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const experiences = await prisma.experience.findMany();
	const users = await prisma.user.findMany();

	console.log('loading ADMIN route');

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