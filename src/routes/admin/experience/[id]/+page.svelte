<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Card from '$lib/components/ui/card';
	import { AlertCircle, TrashIcon } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { experienceSchema, type ExperienceSchema } from '../schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import * as Alert from '$lib/components/ui/alert';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

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
	const { form: formData, enhance: updateFormEnhance } = form;
	let isToggleAvailabilityFormSubmitting = false;
	$: ({ isExperienceAvailable: isAvailable } = data);
</script>

<Card.Root class="mx-auto max-w-xl">
	<Card.Header>
		<div class="mb-4">
			<a href="/admin?target=experiences" class="underline">&larr; Back to All Experiences</a>
		</div>
		<Card.Title tag="h1" class="text-2xl">Edit Experience</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="post" action="?/update" use:updateFormEnhance>
			<Form.Field {form} name="name" class="mb-8">
				<Form.Control let:attrs>
					<Form.Label>Name:</Form.Label>
					<Input {...attrs} bind:value={$formData.name} disabled={!isAvailable} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="imageUrl" class="mb-8">
				<Form.Control let:attrs>
					<Form.Label>Image URL:</Form.Label>
					<Input {...attrs} type="url" bind:value={$formData.imageUrl} disabled={!isAvailable} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="price" class="mb-8">
				<Form.Control let:attrs>
					<Form.Label>Price:</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.price} disabled={!isAvailable} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="description" class="mb-8">
				<Form.Control let:attrs>
					<Form.Label>Description:</Form.Label>
					<Textarea
						{...attrs}
						bind:value={$formData.description}
						rows={10}
						disabled={!isAvailable}
					/>
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
			{#if isAvailable}
				<Form.Button variant="default" class="block w-full">Update this experience</Form.Button>
			{/if}
		</form>
		{#if !isAvailable}
			<Alert.Root variant="destructive">
				<AlertCircle class="h-4 w-4" />
				<Alert.Title>Experience is not active.</Alert.Title>
				<Alert.Description>This experience has been disabled.</Alert.Description>
			</Alert.Root>
		{/if}
		<AlertDialog.Root>
			<AlertDialog.Trigger class="mt-4 block w-full">
				<Button variant="outline" class="flex w-full">
					{#if isAvailable}
						<span>Deactivate this experience</span>
					{:else}
						<span>Re-activate this experience</span>
					{/if}
				</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Description
						>Are you sure you want to {isAvailable ? 'deactivate' : 're-activate'} this experience?</AlertDialog.Description
					>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<form
						action={isAvailable ? '?/deactivate' : '?/reactivate'}
						method="post"
						use:enhance={() => {
							isToggleAvailabilityFormSubmitting = true;
							return async ({ result }) => {
								await applyAction(result);
								isToggleAvailabilityFormSubmitting = false;
								invalidateAll();
							};
						}}
					>
						<AlertDialog.Action type="submit" disabled={isToggleAvailabilityFormSubmitting}
							>Yes, {isAvailable ? 'Deactivate' : 'Re-activate'} it.</AlertDialog.Action
						>
					</form>
					<AlertDialog.Cancel>No, Cancel.</AlertDialog.Cancel>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	</Card.Content>
</Card.Root>
