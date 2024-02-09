import prisma from '$lib/prisma';

export const load = async () => {
	const experiences = await prisma.experience.findMany();
	return {
		experiences
	};
};
