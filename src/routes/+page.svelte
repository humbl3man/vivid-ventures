<script lang="ts">
	import type { Experience } from '@prisma/client';
	import { Button } from '$lib/components/ui/button';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';

	export let data: {
		experiences: Experience[];
	};
</script>

<div class="bg-neutral-content relative flex min-h-[60dvh] items-center justify-center py-24">
	<div class="absolute inset-x-0 inset-y-0 -z-10 block h-full w-full">
		<img src="" alt="" class="object-cover" />
	</div>
	<div class="max-w-2xl space-y-8 text-center">
		<h1>Ready to embark on a journey of vibrant experiences?</h1>

		<p class="lead">
			Discover a world where every moment is a masterpiece waiting to be painted. Dive into our
			curated selection of exhilarating experiences that ignite your senses and awaken your spirit.
		</p>

		<Button href="/" size="lg">Shop Experiences</Button>
	</div>
</div>

<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
	{#each data.experiences as experience (experience.id)}
		<ExperienceCard {experience} />
	{/each}
</div>
