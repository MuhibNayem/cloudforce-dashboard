<script lang="ts">
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import Filter from 'lucide-svelte/icons/filter';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Badge } from '$lib/components/ui/badge';
	import * as Pagination from '$lib/components/ui/pagination/index.js';

	let users = [
		{ name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
		{ name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive' },
		{ name: 'Sam Wilson', email: 'sam@example.com', role: 'Viewer', status: 'Active' },
		{ name: 'Alex Johnson', email: 'alex@example.com', role: 'Editor', status: 'Active' }
	];

	const roles = ['Admin', 'Editor', 'Viewer'];
	const statuses = ['Active', 'Inactive'];

	function getRandomElement(arr: Array<string>) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function generateRandomName() {
		const firstNames = [
			'Alice',
			'Bob',
			'Charlie',
			'David',
			'Eva',
			'Frank',
			'Grace',
			'Henry',
			'Ivy',
			'Jack'
		];
		const lastNames = [
			'Brown',
			'Davis',
			'Miller',
			'Wilson',
			'Moore',
			'Taylor',
			'Anderson',
			'Thomas',
			'Jackson',
			'White'
		];
		return `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
	}

	function generateRandomEmail(name: string) {
		const domains = ['example.com', 'email.com', 'mail.com', 'web.com'];
		const email = name.toLowerCase().replace(' ', '.') + '@' + getRandomElement(domains);
		return email;
	}

	function addUsers(count: number) {
		for (let i = 0; i < count; i++) {
			const name = generateRandomName();
			users = [
				...users,
				{
					name: name,
					email: generateRandomEmail(name),
					role: getRandomElement(roles),
					status: getRandomElement(statuses)
				}
			];
		}
	}

	addUsers(50);

	let count = users.length;
	let currentPage: number = 1;

	$: perPage = 5;
	$: siblingCount = 1;
	$: paginatedUsers = users.slice((currentPage - 1) * perPage, currentPage * perPage);

	function handlePageChange(page: number): void {
		currentPage = page;
	}
</script>

<main class="space-y-6 p-4">
	<div class="flex items-center justify-between">
		<h1 class="text-xl font-bold">Students</h1>
		<Button variant="default">Add User</Button>
	</div>

	<div class="flex items-center gap-4">
		<Input type="search" placeholder="Search users..." />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" class="gap-2" builders={[builder]}>
					<Filter class="h-4 w-4" />
					<span>Filter</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Label>Filter by role</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.CheckboxItem checked>Admin</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem>Editor</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem>Viewer</DropdownMenu.CheckboxItem>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>

	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Name</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head>Role</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each paginatedUsers as user}
				<Table.Row>
					<Table.Cell>{user.name}</Table.Cell>
					<Table.Cell>{user.email}</Table.Cell>
					<Table.Cell>{user.role}</Table.Cell>
					<Table.Cell>
						<Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
							{user.status}
						</Badge>
					</Table.Cell>
					<Table.Cell class="text-right">
						<Button size="sm" variant="outline">Edit</Button>
						<Button size="sm" variant="destructive">Delete</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>

	<Pagination.Root {count} {perPage} {siblingCount} let:pages>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton on:click={() => handlePageChange(currentPage - 1)}>
					<ChevronLeft class="h-4 w-4" />
				</Pagination.PrevButton>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link
							{page}
							isActive={currentPage === page.value}
							on:click={() => handlePageChange(page.value)}
						>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton on:click={() => handlePageChange(currentPage + 1)}>
					<ChevronRight class="h-4 w-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
</main>
