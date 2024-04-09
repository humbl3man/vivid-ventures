import { Role } from '@prisma/client';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.user || event.locals.user.role !== Role.ADMIN) {
		return error(401, {
			message: 'Unauthorized'
		});
	}
};
