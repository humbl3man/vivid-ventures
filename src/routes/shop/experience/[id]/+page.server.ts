import prisma from '$lib/prisma';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const experienceFound = await prisma.experience.findUnique({
		where: {
			id: Number(params.id)
		},
		select: {
			name: true,
			description: true,
			imageUrl: true,
			price: true,
			isAvailable: true
		}
	});

	// redirect users from unavailable experiences
	if (!experienceFound?.isAvailable) {
		redirect(303, '/shop');
	}

	if (!experienceFound) {
		error(404, {
			message: 'Experience not found'
		});
	}

	return {
		experience: experienceFound
	};
};

export const actions = {
	addToCart: async (event) => {
		if (!event.locals.user) {
			redirect(302, event.url);
		}

		// update cart
		// if item is new, add
		// if item already exists, increment quantity
		await prisma.cart.update({
			where: {
				userId: event.locals.user.id
			},
			data: {
				items: {
					upsert: {
						where: {
							experienceId: +event.params.id
						},
						update: {
							quantity: {
								increment: 1
							}
						},
						create: {
							quantity: 1,
							experience: {
								connect: {
									id: +event.params.id
								}
							}
						}
					}
				}
			}
		});

		redirect(302, '/cart');
	}
};
