import { lucia } from '$lib/auth.js';
import { error, redirect } from '@sveltejs/kit';

export const load = (event) => {
	redirect(302, '/');
};

export const actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return error(401, {
				message: 'Invalid Request'
			});
		}

		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		// TODO: redirect users to referral URL
		redirect(302, '/');
	}
};
