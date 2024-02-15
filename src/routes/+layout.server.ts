export const load = (event) => {
	return {
		username: event.locals.user?.username
	};
};
