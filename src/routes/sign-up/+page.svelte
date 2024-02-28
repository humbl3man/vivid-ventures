<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import RegisterForm from './RegisterForm.svelte';

	export let data;
</script>

<Card.Root class="mx-auto max-w-lg">
	<Card.Header>
		<Card.Title tag="h1" class="text-2xl">Create New Account</Card.Title>
	</Card.Header>
	<Card.Content>
		<RegisterForm data={data.form} />
	</Card.Content>
	<Card.Footer>
		Already have an account? <a href="/login" class="ml-2 text-blue-500 hover:underline">Login</a>
	</Card.Footer>
</Card.Root>
