<script lang="ts">
	import type { Experience, User } from '@prisma/client';
	import ExperienceCard from '../../components/ExperienceCard.svelte';

	export let data;

	const experiences: Experience[] = data.experiences;
	const users: User[] = data.users;
	$: console.log(data);
</script>

<h1 class="mb-4 text-4xl font-bold">Admin Tools</h1>

<h2 class="mb-3 text-3xl font-bold">Experiences</h2>
<div class="my-8">
	<a href="/admin/experience/create" class="btn btn-neutral btn-sm">Create Experience</a>

	{#each experiences as experience}
		<ExperienceCard {experience} />
	{:else}
		<p>There are no experiences.</p>
	{/each}
</div>

<h2 class="mb-3 text-3xl font-bold">Users</h2>
<div class="my-8">
	{#each users as user (user.username)}
		<p>{user.username}</p>
	{:else}
		<p>There are no experiences.</p>
	{/each}
</div>
