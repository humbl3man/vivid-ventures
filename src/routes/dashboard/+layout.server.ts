import { redirect } from '@sveltejs/kit';

export const load = async (request) => {
	// check if user is authenticated
	if (!request.locals.user) {
		redirect(301, '/');
	}
};
