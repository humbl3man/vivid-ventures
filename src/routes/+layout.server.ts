export const load = (event) => {
	console.log(event.locals);

	return {
		username: event.locals.user?.username,
		avatar: event.locals.user?.avatar,
		role: event.locals.user?.role
	};
};
