import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	console.log(locals.user?.id);

	if (!locals.user) {
		redirect(302, '/shop');
	}

	const userCart = await prisma.cart.findUnique({
		where: {
			userId: locals.user?.id
		},
		include: {
			items: {
				include: {
					experience: true
				}
			}
		}
	});

	return {
		userCart
	};
};
