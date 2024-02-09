<script lang="ts">
	import type { Experience } from '@prisma/client';
	import ExperienceCard from '../components/ExperienceCard.svelte';

	export let data: {
		experiences: Experience[];
	};
	$: console.log('data', data);
</script>

<h1 class="mb-4 text-4xl font-bold">Vivid Ventures</h1>
<h2 class="mb-4 text-2xl font-bold">Experiences</h2>

<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
	{#each data.experiences as experience (experience.id)}
		<ExperienceCard {experience} />
	{/each}
</div>
