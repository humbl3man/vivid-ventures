<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';

	export let data;
	$: console.log('data');
</script>

<h1 class="mb-16">Experiences</h1>
<div class="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
	{#each data.experiences as experience (experience.id)}
		<a href={`/shop/experience/${experience.id}`}>
			<ExperienceCard {experience} />
		</a>
	{/each}
</div>
