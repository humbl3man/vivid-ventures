import prisma from '$lib/prisma';

export const load = async (event) => {
	const userId = event.locals.user?.id;
	let cartItemsCount = 0;

	if (userId) {
		const cart = await prisma.cart.findUnique({
			where: {
				userId
			},
			include: {
				items: true
			}
		});
		cartItemsCount = cart?.items.length ?? 0;
	}

	return {
		username: event.locals.user?.username,
		avatar: event.locals.user?.avatar,
		role: event.locals.user?.role,
		cartItemsCount
	};
};
