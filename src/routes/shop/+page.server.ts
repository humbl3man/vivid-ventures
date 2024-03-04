import prisma from '$lib/prisma';

export const load = async (event) => {
	const experiences = await prisma.experience.findMany();

	return {
		experiences
	};
};
