<script lang="ts">
	import { Role, type Experience, type User } from '@prisma/client';
	import { applyAction, enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import formatPrice from '$utilities/formatPrice';
	import formatDate from '$utilities/formatDate';

	export let data;

	$: ({ experiences, users } = data);
</script>

<h1 class="mb-4 text-4xl font-bold">Admin Tools</h1>

<div class="my-8">
	<h2 class="mb-6 flex items-center text-3xl font-bold">
		Experiences <a href="/admin/experience/create" class="btn btn-primary btn-sm ml-auto"
			>Create Experience +</a
		>
	</h2>

	<table class="table table-zebra table-pin-cols table-xs">
		<thead>
			<tr>
				<th></th>
				<th>Name</th>
				<th>Price</th>
				<th>Created At</th>
				<th>Updated At</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each experiences as experience (experience.id)}
				<tr>
					<td>{experience.id}</td>
					<td>{experience.name}</td>
					<td>{formatPrice(experience.price)}</td>
					<td>{formatDate(experience.createdAt)}</td>
					<td>{formatDate(experience.updatedAt)}</td>
					<td>
						<a class="btn btn-neutral btn-xs" href={'/admin/experience/' + experience.id}>Edit</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="divider"></div>
<div class="my-8">
	<h2 class="mb-6 text-3xl font-bold">Users</h2>
	<table class="table table-zebra table-pin-cols table-xs">
		<thead>
			<tr>
				<th></th>
				<th>Username</th>
				<th>Role</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each users as user (user.username)}
				{@const isUser = user.role === Role.USER}
				<tr>
					<td>{user.id}</td>
					<td>{user.username}</td>
					<td>{user.role}</td>
					<td>
						{#if isUser}
							<form
								novalidate
								method="post"
								action="?/delete"
								use:enhance={() => {
									return async ({ result }) => {
										await applyAction(result);
										invalidate((url) => url.pathname === $page.url.pathname);
									};
								}}
							>
								<input type="hidden" name="user_id" value={user.id} />
								<button type="submit" class="btn btn-error btn-xs">Delete</button>
							</form>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
