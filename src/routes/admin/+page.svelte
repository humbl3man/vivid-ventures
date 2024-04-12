<script lang="ts">
	import { Role } from '@prisma/client';
	import { page } from '$app/stores';
	import formatPrice from '$utils/formatPrice';
	import formatDate from '$utils/formatDate';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import * as Tabs from '$lib/components/ui/tabs';

	export let data;

	enum ContentType {
		EXPERIENCES = 'experiences',
		USERS = 'users'
	}

	const contentTypeQuery = $page.url.searchParams.get('content_type');
	const contentTypeSelected =
		contentTypeQuery &&
		(contentTypeQuery === ContentType.EXPERIENCES || contentTypeQuery === ContentType.USERS)
			? contentTypeQuery
			: ContentType.EXPERIENCES;

	$: ({ experiences, users } = data);
</script>

<h1 class="mb-4 text-4xl font-bold">Admin Tools</h1>

<Tabs.Root value={contentTypeSelected}>
	<Tabs.List class="mb-8">
		<Tabs.Trigger value="experiences">Experiences</Tabs.Trigger>
		<Tabs.Trigger value="users">Users</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value={ContentType.EXPERIENCES}>
		<div class="my-4">
			<Button href="/admin/experience/create" variant="secondary">Create Experience +</Button>
		</div>
		<Table.Root>
			<Table.Caption class="sr-only">List of active experiences</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>ID</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Price</Table.Head>
					<Table.Head>Created At</Table.Head>
					<Table.Head>Updated At</Table.Head>
					<Table.Head></Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each experiences as experience (experience.id)}
					{@const editURL = `/admin/experience/${experience.id}`}
					<Table.Row class={experience.isAvailable ? '' : 'opacity-40'}>
						<Table.Cell>{experience.id}</Table.Cell>
						<Table.Cell
							>{experience.name}
							{#if !experience.isAvailable}<span class="ml-2 text-red-600">Unavailable</span
								>{/if}</Table.Cell
						>
						<Table.Cell>{formatPrice(experience.price)}</Table.Cell>
						<Table.Cell>{formatDate(experience.createdAt)}</Table.Cell>
						<Table.Cell>{formatDate(experience.updatedAt)}</Table.Cell>
						<Table.Cell>
							<Button variant="secondary" size="sm" href={editURL}>Edit</Button>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Tabs.Content>
	<Tabs.Content value={ContentType.USERS}>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>ID</Table.Head>
					<Table.Head>Username</Table.Head>
					<Table.Head>Role</Table.Head>
					<!-- <Table.Head></Table.Head> -->
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each users as user (user.username)}
					{@const isUser = user.role === Role.USER}
					<Table.Row>
						<Table.Cell>{user.id}</Table.Cell>
						<Table.Cell>{user.username}</Table.Cell>
						<Table.Cell>{user.role}</Table.Cell>
						<!-- <Table.Cell>
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
								<Button type="submit" variant="destructive" size="sm">Delete</Button>
							</form>
						{/if}
					</Table.Cell> -->
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Tabs.Content>
</Tabs.Root>
