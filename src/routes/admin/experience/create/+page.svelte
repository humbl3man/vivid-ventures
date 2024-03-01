<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import CreateExperienceForm from './CreateExperienceForm.svelte';

	export let data;
</script>

<Card.Root class="mx-auto max-w-xl">
	<Card.Header>
		<Card.Title tag="h1" class="text-2xl">Create Experience</Card.Title>
	</Card.Header>
	<Card.Content>
		<CreateExperienceForm data={data.form} />
	</Card.Content>
</Card.Root>
