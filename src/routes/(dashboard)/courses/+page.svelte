<script>
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="grid min-h-screen w-full">
	<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
		<div class="flex items-center">
			<h1 class="text-lg font-semibold md:text-2xl">Courses</h1>
		</div>
		<div
			data-x-chunk-name="dashboard-02-chunk-1"
			data-x-chunk-description="An empty state showing no products with a heading, description and a call to action to add a product."
			class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
		>
			<div class="flex flex-col items-center gap-1 text-center">
				<h3 class="text-2xl font-bold tracking-tight">You have no course yet</h3>
				<p class="text-sm text-muted-foreground">
					You can start selling as soon as you add a course.
				</p>
				<Button class="mt-4">Add Course</Button>
			</div>
		</div>
	</main>
</div>
