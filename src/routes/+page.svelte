<script lang="ts">
	import type { Experience } from '@prisma/client';
	import ExperienceCard from '../components/ExperienceCard.svelte';

	export let data: {
		experiences: Experience[];
	};
</script>

<div
	class="vv-hero relative z-0 flex h-dvh w-dvw items-center justify-center bg-slate-700 bg-cover bg-center bg-no-repeat bg-blend-overlay"
>
	<div class="absolute inset-x-0 inset-y-0 -z-10 block h-full w-full">
		<img src="" alt="" class="object-cover" />
	</div>
	<div class="max-w-2xl text-center text-neutral-content">
		<h1 class="mb-8 text-5xl font-bold text-white">
			Ready to embark on a journey of vibrant experiences?
		</h1>

		<p class="text-xl">
			Discover a world where every moment is a masterpiece waiting to be painted. Dive into our
			curated selection of exhilarating experiences that ignite your senses and awaken your spirit.
		</p>
		<a href="/" class="btn btn-primary btn-lg mt-8">Shop Experiences</a>
	</div>
</div>

<!-- <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
	{#each data.experiences as experience (experience.id)}
		<ExperienceCard {experience} />
	{/each}
</div> -->

<style>
	.vv-hero {
		background-image: url('https://images.unsplash.com/photo-1682695794947-17061dc284dd?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
	}
</style>
