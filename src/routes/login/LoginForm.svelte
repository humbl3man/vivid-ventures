<script lang="ts">
	import * as Form from '$lib/components/ui/form';

	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms/client';
	import { loginSchema, type LoginSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';

	export let data: SuperValidated<Infer<LoginSchema>>;
	const form = superForm(data, {
		validators: zodClient(loginSchema)
	});
	const { form: formData, message, enhance } = form;
</script>

<form method="post" use:enhance>
	<Form.Field {form} name="username" class="mb-6">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password" class="mb-6">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} bind:value={$formData.password} type="password" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	{#if $message}
		<div class="my-3 text-red-500">{$message}</div>
	{/if}
	<Form.Button variant="default" class="block w-full">Login</Form.Button>
</form>
