import { z } from 'zod';

export const experienceSchema = z.object({
	name: z.string().min(5).max(100),
	description: z.string().min(5).max(10000),
	price: z.coerce.number().int().gte(999).lte(999999),
	imageUrl: z.string().url()
});

export type ExperienceSchema = typeof experienceSchema;
