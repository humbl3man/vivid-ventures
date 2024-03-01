<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Card from '$lib/components/ui/card';
	import { AlertCircle, TrashIcon } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { experienceSchema, type ExperienceSchema } from '../schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms/client';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	export let data;
	const form = superForm(data.form, {
		validators: zodClient(experienceSchema),
		delayMs: 300,
		timeoutMs: 2000,
		multipleSubmits: 'prevent',
		resetForm: false,
		onUpdated(event) {
			if (event.form.message) {
				toast(event.form.message);
			}
		}
	});
	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto max-w-xl">
	<Card.Header>
		<Card.Title tag="h1" class="text-2xl">Edit Experience</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="post" action="?/update" use:enhance>
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
					<Textarea {...attrs} bind:value={$formData.description} rows={10} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
			<Form.Button variant="default" class="block w-full">Update this experience</Form.Button>
		</form>
		<Dialog.Root>
			<Dialog.Trigger class="mt-4 block w-full">
				<Button variant="secondary" class="flex w-full">
					<TrashIcon class="mr-2 h-4 w-4" />
					<span>Delete</span>
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Title>Are you sure you want to delete this experience?</Dialog.Title>
				<Dialog.Description>
					<form action="?/delete" method="post">
						<Button type="submit" variant="destructive">Yes, Delete.</Button>
					</form>
				</Dialog.Description>
				<Dialog.Footer>
					<div class="flex items-center gap-1 text-orange-600">
						<AlertCircle class="h-4 w-4" />
						This action cannot be undone.
					</div>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</Card.Content>
</Card.Root>
