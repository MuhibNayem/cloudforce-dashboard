<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	let status: number = $page.status;
	let error: string | undefined = $page?.error?.message;
	const navigateToHome = () => {
		goto('/');
	};
</script>

<main class="mx-auto flex h-screen flex-col items-center justify-center bg-white p-6">
	{#if status === 404}
		<div class="text-center">
			<img src="/src/lib/img/404.svg" alt="Not Found" class="mx-auto mb-4 h-auto w-64" />
			<h1 class="gray-900 bold">404 - Page Not Found</h1>
			<p class="gray-900">The page you are looking for does not exist.</p>
			<Button on:click={navigateToHome} variant="default" class="mt-6">Back</Button>
		</div>
	{:else}
		<div class="text-center">
			<h1 class="gray-900 bold">Error {status}</h1>
			<p color="gray-600">{error}</p>
		</div>
	{/if}
</main>
