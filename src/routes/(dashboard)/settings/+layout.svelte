<script lang="ts">
	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';

	let selected = '';

	beforeUpdate(() => {
		selected = $page.url.pathname.split('/')[2];
	});

	function onSettingsItemClick(item: string) {
		selected = item;
	}
</script>

<main
	class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
>
	<div class="mx-auto grid w-full max-w-6xl gap-2">
		<h1 class="text-3xl font-semibold">Settings</h1>
	</div>
	<div
		class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
	>
		<nav
			class="grid gap-4 text-sm text-muted-foreground md:flex md:flex-col md:flex-nowrap md:overflow-visible md:whitespace-nowrap"
		>
			<a
				href="/settings/general"
				class={selected === 'general' ? 'font-semibold text-primary' : ''}
				on:click={() => onSettingsItemClick('general')}>General</a
			>
			<a
				class={selected === 'security' ? 'font-semibold text-primary' : ''}
				href="/settings/security"
				on:click={() => onSettingsItemClick('security')}>Security</a
			>
			<a
				class={selected === 'support' ? 'font-semibold text-primary' : ''}
				href="/settings/support"
				on:click={() => onSettingsItemClick('support')}>Support</a
			>
		</nav>
		<slot></slot>
	</div>
</main>

<style>
	@media (max-width: 767px) {
		nav {
			display: flex;
			overflow-x: auto;
			white-space: nowrap;
			padding: 0 1rem;
			flex-direction: row;
		}

		nav a {
			flex: 0 0 auto;
			margin-right: 1rem;
		}
	}
</style>
