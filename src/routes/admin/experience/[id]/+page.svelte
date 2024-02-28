<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, errors, message, enhance, delayed } = superForm(data.form, {
		delayMs: 500,
		timeoutMs: 3000
	});

	let deleteModalElement: HTMLDialogElement;
</script>

<div class="mx-auto mt-8 max-w-xl">
	<div class="mb-4 space-y-4">
		<h1 class="text-2xl font-bold">Edit Experience</h1>
		{#if $message}
			<div role="alert" class="alert alert-success">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				{$message}
			</div>
		{/if}
	</div>

	<form class="block max-w-[600px]" action="?/update" method="post" use:enhance>
		<div class="mb-3">
			<label for="name" class="mb-1 inline-block font-bold">Name:</label>
			<input
				type="text"
				class="input input-bordered w-full"
				id="name"
				name="name"
				required
				bind:value={$form.name}
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
				required
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
				required
				bind:value={$form.imageUrl}
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
				required
				bind:value={$form.price}
			/>
			{#if $errors.price}
				<p class="text-red-500">{$errors.price}</p>
			{/if}
		</div>
		<div>
			<button type="submit" class="btn btn-neutral w-full{$delayed ? ' btn-disabled' : ''}">
				{#if $delayed}
					<span class="loading loading-spinner mr-2"></span>
					Updating...
				{:else}
					Update Experience
				{/if}
			</button>
		</div>
	</form>
	<div class="mt-4 text-center">
		<button
			type="button"
			class="btn btn-link text-error {$delayed ? 'btn-disabled' : ''}"
			on:click={() => deleteModalElement.showModal()}
		>
			Delete Experience
		</button>
	</div>
</div>

<!-- Delete Confirmation Modal -->
<dialog class="modal" bind:this={deleteModalElement}>
	<div class="modal-box">
		<p>Are you sure you want to delete this experience?</p>
		<div class="modal-action">
			<form action="?/delete" method="post">
				<button type="submit" class="btn btn-error">Yes, Delete.</button>
			</form>
			<form method="dialog">
				<button class="btn">No, Cancel.</button>
			</form>
		</div>
	</div>
</dialog>
