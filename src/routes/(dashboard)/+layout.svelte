<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import House from 'lucide-svelte/icons/House';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import UsersRound from 'lucide-svelte/icons/users-round';

	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { post } from '$lib/services/axios';
	import { CircleUser } from 'lucide-svelte';
	import { page } from '$app/stores';
	import type { AxiosError } from 'axios';
	import { useToast } from '$lib/hooks/useToast';

	let authenticated = false;
	let selected = 'dashboard';

	const { showErrorToast } = useToast();

	onMount(() => {
		authenticated = JSON.parse(localStorage.getItem('authenticated') ?? '{}');
		selected = $page.url.pathname !== '/' ? $page.url.pathname.split('/')[1] : 'dashboard';
		if (
			!authenticated ||
			(typeof authenticated === 'object' && !Object.keys(authenticated).length)
		) {
			goto('/login');
			return;
		}
	});

	const onLogout = async () => {
		try {
			const accessToken = JSON.parse(localStorage.getItem('accessToken') ?? '{}');
			const refreshToken = JSON.parse(localStorage.getItem('refreshToken') ?? '{}');
			const response = await post(`http://localhost:8000/api/v1/auth/logout`, {
				access_token: accessToken,
				refresh_token: refreshToken
			});
			if (response?.data) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				localStorage.setItem('authenticated', JSON.stringify(false));
				localStorage.setItem('selectedSidebarItem', JSON.stringify('dashboard'));
				goto('/login');
			}
		} catch (error) {
			const axiosError = error as unknown as AxiosError;
			showErrorToast('failed', axiosError?.response?.statusText);
		}
	};

	function onSideBarItemClick(item: string) {
		selected = item;
		goto(selected === 'dashboard' ? '/' : `/${item}`);
	}

	function onDropdownItemClick(link: string) {
		selected = link.split('/')[1];
		goto(link);
	}
</script>

{#if authenticated}
	<div class="flex min-h-screen w-full flex-col bg-muted/40">
		<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/"
							class={`flex h-9 w-9 items-center justify-center rounded-lg ${selected === 'dashboard' && 'bg-accent'} text-${selected === 'dashboard' ? 'accent' : 'muted'}-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
							use:builder.action
							{...builder}
							on:click={() => onSideBarItemClick('dashboard')}
						>
							<House class="h-5 w-5" />
							<span class="sr-only">Dashboard</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Dashboard</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/transactions"
							on:click={() => onSideBarItemClick('transactions')}
							class={`flex h-9 w-9 items-center justify-center rounded-lg ${selected === 'transactions' && 'bg-accent'} text-${selected === 'transactions' ? 'accent' : 'muted'}-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
							use:builder.action
							{...builder}
						>
							<ShoppingCart class="h-5 w-5" />
							<span class="sr-only">Transactions</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Transactions</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/courses"
							on:click={() => onSideBarItemClick('courses')}
							class={`flex h-9 w-9 items-center justify-center rounded-lg ${selected === 'courses' && 'bg-accent'} text-${selected === 'courses' ? 'accent' : 'muted'}-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
							use:builder.action
							{...builder}
						>
							<BookOpen class="h-5 w-5" />
							<span class="sr-only">Courses</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Courses</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/students"
							on:click={() => onSideBarItemClick('students')}
							class={`flex h-9 w-9 items-center justify-center rounded-lg ${selected === 'students' && 'bg-accent'} text-${selected === 'students' ? 'accent' : 'muted'}-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
							use:builder.action
							{...builder}
						>
							<UsersRound class="h-5 w-5" />
							<span class="sr-only">Students</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Students</Tooltip.Content>
				</Tooltip.Root>
			</nav>
			<nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/settings/general"
							on:click={() => onSideBarItemClick('settings')}
							class={`flex h-9 w-9 items-center justify-center rounded-lg ${selected === 'settings' && 'bg-accent'} text-${selected === 'settings' ? 'accent' : 'muted'}-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
							use:builder.action
							{...builder}
						>
							<Settings class="h-5 w-5" />
							<span class="sr-only">Settings</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Settings</Tooltip.Content>
				</Tooltip.Root>
			</nav>
		</aside>
		<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
			<header
				class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
			>
				<Sheet.Root>
					<Sheet.Trigger asChild let:builder>
						<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
							<PanelLeft class="h-5 w-5" />
							<span class="sr-only">Toggle Menu</span>
						</Button>
					</Sheet.Trigger>
					<Sheet.Content side="left" class="flex flex-col sm:max-w-xs">
						<nav class="grid gap-6 text-lg font-medium">
							<a
								href="/"
								class={`flex items-center gap-4 px-2.5 text-${selected === 'dashboard' ? '' : 'muted-'}foreground hover:text-foreground`}
								on:click={() => onSideBarItemClick('dashboard')}
							>
								<House class="h-5 w-5" />
								Dashboard
							</a>
							<a
								href="/transactions"
								class={`flex items-center gap-4 px-2.5 text-${selected === 'transactions' ? '' : 'muted-'}foreground hover:text-foreground`}
								on:click={() => onSideBarItemClick('transactions')}
							>
								<ShoppingCart class="h-5 w-5" />
								Transaction
							</a>
							<a
								href="/courses"
								class={`flex items-center gap-4 px-2.5 text-${selected === 'courses' ? '' : 'muted-'}foreground hover:text-foreground`}
								on:click={() => onSideBarItemClick('courses')}
							>
								<BookOpen class="h-5 w-5" />
								Courses
							</a>
							<a
								href="/students"
								class={`flex items-center gap-4 px-2.5 text-${selected === 'students' ? '' : 'muted-'}foreground hover:text-foreground`}
								on:click={() => onSideBarItemClick('students')}
							>
								<UsersRound class="h-5 w-5" />
								Students
							</a>
						</nav>
						<nav class="mt-auto">
							<a
								href="/settings/general"
								class={`flex items-center gap-4 px-2.5 text-${selected === 'settings' ? '' : 'muted-'}foreground hover:text-foreground`}
								on:click={() => onSideBarItemClick('settings')}
							>
								<Settings class="h-5 w-5" />
								Settings
							</a>
						</nav>
					</Sheet.Content>
				</Sheet.Root>

				<div class="relative ml-auto flex-1 md:grow-0">
					<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search..."
						class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
					/>
				</div>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							variant="outline"
							size="icon"
							class="overflow-hidden rounded-full"
						>
							<CircleUser class="h-5 w-5" />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={() => onDropdownItemClick('/settings/general')}
							>Settings</DropdownMenu.Item
						>
						<DropdownMenu.Item on:click={() => onDropdownItemClick('/settings/support')}
							>Support</DropdownMenu.Item
						>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={onLogout}>Logout</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</header>
			<slot></slot>
		</div>
	</div>
{/if}
