<script lang="ts">
	import { enhance } from '$app/forms';

	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { form, errors, message } = superForm(data.form);
</script>

<h1 class="mb-6 text-4xl font-bold">Sign Up</h1>

<form method="post" novalidate use:enhance class="max-w-[500px]">
	<div class="mb-4">
		<label for="username">Username:</label>
		<input
			type="text"
			name="username"
			id="username"
			class="input input-bordered w-full"
			minlength="3"
			maxlength="31"
			required
			bind:value={$form.username}
		/>
		{#if $errors?.username}
			<p class="text-red-600">{$errors.username[0]}</p>
		{/if}
	</div>
	<div class="mb-4">
		<label for="password">Password:</label>
		<input
			type="password"
			name="password"
			id="password"
			class="input input-bordered w-full"
			required
			minlength="6"
			maxlength="255"
			bind:value={$form.password}
		/>
		{#if $errors?.password}
			<p class="text-red-600">{$errors.password[0]}</p>
		{/if}
	</div>
	{#if $message}
		<div class="my-3 text-red-500">{$message}</div>
	{/if}
	<div>
		<button type="submit" class="btn btn-neutral">Sign Up</button>
		<p class="mt-2">
			Already have an account? <a href="/login" class="link link-secondary">Login</a>
		</p>
	</div>
</form>
