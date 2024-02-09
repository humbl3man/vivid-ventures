<h1 class="mb-4 text-2xl font-bold">Add Experience</h1>

<form class="block max-w-[600px]" method="post">
	<div class="mb-3">
		<label for="name" class="mb-1 inline-block font-bold">Name:</label>
		<input type="text" class="input input-bordered w-full" id="name" name="name" required />
	</div>
	<div class="mb-3">
		<label for="description" class="mb-1 inline-block font-bold">Description:</label>
		<textarea
			rows={3}
			class="textarea textarea-bordered w-full"
			id="description"
			name="description"
		/>
	</div>
	<div class="mb-3">
		<label for="image_url" class="mb-1 inline-block font-bold">Image Url:</label>
		<input type="url" class="input input-bordered w-full" id="image_url" name="imageUrl" required />
	</div>
	<div class="mb-3">
		<label for="price" class="mb-1 inline-block font-bold">Price:</label>
		<input type="number" class="input input-bordered w-full" id="price" name="price" required />
	</div>
	<div>
		<button type="submit" class="btn btn-neutral w-full">Create</button>
	</div>
</form>
