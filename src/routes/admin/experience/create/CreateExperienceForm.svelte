<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Alert from '$lib/components/ui/alert';
	import { experienceSchema, type ExperienceSchema } from '../schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms/client';
	import { AlertCircleIcon } from 'lucide-svelte';

	export let data: SuperValidated<Infer<ExperienceSchema>>;
	const form = superForm(data, {
		validators: zodClient(experienceSchema),
		delayMs: 300,
		timeoutMs: 2000
	});
	const { form: formData, message, enhance } = form;
</script>

<form method="post" use:enhance>
	{#if $message}
		<Alert.Root class="bg-green-100">
			<AlertCircleIcon class="h-5 w-5" />
			<Alert.Title>Success!</Alert.Title>
			<Alert.Description>{$message}</Alert.Description>
		</Alert.Root>
	{/if}
	<Form.Field {form} name="name" class="mb-8">
		<Form.Control let:attrs>
			<Form.Label>Name:</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
			<Form.FieldErrors />
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="imageUrl" class="mb-8">
		<Form.Control let:attrs>
			<Form.Label>Image URL:</Form.Label>
			<Input {...attrs} type="url" bind:value={$formData.imageUrl} />
			<Form.FieldErrors />
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="price" class="mb-8">
		<Form.Control let:attrs>
			<Form.Label>Price:</Form.Label>
			<Input {...attrs} type="number" bind:value={$formData.price} />
			<Form.FieldErrors />
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="description" class="mb-8">
		<Form.Control let:attrs>
			<Form.Label>Description:</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
			<Form.FieldErrors />
		</Form.Control>
	</Form.Field>
	<Form.Button variant="default" class="block w-full">Create</Form.Button>
</form>
