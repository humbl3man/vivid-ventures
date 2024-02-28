export const load = (event) => {
	return {
		username: event.locals.user?.username,
		avatar: event.locals.user?.avatar,
		role: event.locals.user?.role
	};
};
