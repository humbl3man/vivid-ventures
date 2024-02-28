<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { experienceSchema, type ExperienceSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms/client';

	export let data: SuperValidated<Infer<ExperienceSchema>>;
	export let action: 'Create' | 'Edit' = 'Create';
	const form = superForm(data, {
		validators: zodClient(experienceSchema),
		delayMs: 300,
		timeoutMs: 2000
	});
	const { form: formData, message, enhance } = form;
</script>

<form method="post" use:enhance>
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
	<Form.Button variant="default" class="block w-full">{action}</Form.Button>
</form>
