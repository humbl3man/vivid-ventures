<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import LoginForm from './LoginForm.svelte';

	export let data;
</script>

<Card.Root class="mx-auto max-w-lg">
	<Card.Header>
		<Card.Title tag="h1" class="text-2xl">Sign In to Your Account</Card.Title>
	</Card.Header>
	<Card.Content>
		<LoginForm data={data.form} />
	</Card.Content>
	<Card.Footer>
		Don't have an account? <a href="/sign-up" class="ml-2 text-blue-500 hover:underline">Sign Up</a>
	</Card.Footer>
</Card.Root>
