import { Role } from '@prisma/client';
import { error, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	if (event.locals.user.role !== Role.ADMIN) {
		error(403, {
			message: 'Access Denied'
		});
	}
};
