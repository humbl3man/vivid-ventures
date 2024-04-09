import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
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

export const actions = {
	remove: async ({ locals, request }) => {
		const userId = locals.user?.id;
		const experienceId = Number((await request.formData()).get('experience_id'));
		const cart = await prisma.cart.findUnique({
			where: {
				userId
			}
		});

		await prisma.cartItem.delete({
			where: {
				cartId: cart?.id,
				experienceId: experienceId
			}
		});

		console.log('remove action called');
	}
};
