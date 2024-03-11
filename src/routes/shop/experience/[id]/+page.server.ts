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

export const actions = {
	addToBag: async (event) => {
		if (!event.locals.user) {
			redirect(302, event.url);
		}

		await prisma.cart.update({
			where: {
				userId: event.locals.user.id
			},
			data: {
				items: {
					upsert: {
						where: {
							id: +event.params.id
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
