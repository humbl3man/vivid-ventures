<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { superForm } from 'sveltekit-superforms';
	import ExperienceForm from '../ExperienceForm.svelte';

	export let data;
</script>

<Card.Root class="mx-auto max-w-xl">
	<Card.Header>
		<Card.Title tag="h1" class="text-2xl">Create Experience</Card.Title>
	</Card.Header>
	<Card.Content>
		<ExperienceForm data={data.form} action="Create" />
	</Card.Content>
</Card.Root>
