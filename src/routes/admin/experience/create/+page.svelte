<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, errors, delayed, enhance } = superForm(data.form, {
		delayMs: 300,
		timeoutMs: 2000
	});
</script>

<div class="mx-auto mt-8 max-w-xl">
	<h1 class="mb-4 text-center text-2xl font-bold">Add Experience</h1>

	<form class="mx-auto block max-w-[600px]" method="post" novalidate use:enhance>
		<div class="mb-3">
			<label for="name" class="mb-1 inline-block font-bold">Name:</label>
			<input
				type="text"
				class="input input-bordered w-full"
				id="name"
				name="name"
				bind:value={$form.name}
				required
			/>
			{#if $errors.name}
				<p class="text-red-500">{$errors.name}</p>
			{/if}
		</div>
		<div class="mb-3">
			<label for="description" class="mb-1 inline-block font-bold">Description:</label>
			<textarea
				rows={3}
				class="textarea textarea-bordered w-full"
				id="description"
				name="description"
				bind:value={$form.description}
			/>
			{#if $errors.description}
				<p class="text-red-500">{$errors.description}</p>
			{/if}
		</div>
		<div class="mb-3">
			<label for="image_url" class="mb-1 inline-block font-bold">Image Url:</label>
			<input
				type="url"
				class="input input-bordered w-full"
				id="image_url"
				name="imageUrl"
				bind:value={$form.imageUrl}
				required
			/>
			{#if $errors.imageUrl}
				<p class="text-red-500">{$errors.imageUrl}</p>
			{/if}
		</div>
		<div class="mb-3">
			<label for="price" class="mb-1 inline-block font-bold">Price:</label>
			<input
				type="number"
				class="input input-bordered w-full"
				id="price"
				name="price"
				bind:value={$form.price}
				required
			/>
			{#if $errors.price}
				<p class="text-red-500">{$errors.price}</p>
			{/if}
		</div>
		<div>
			<button type="submit" class="btn btn-neutral w-full {$delayed ? 'btn-disabled' : ''}">
				{#if $delayed}<span class="loading loading-spinner loading-sm"></span>{/if}
				Create
			</button>
		</div>
	</form>
</div>
