<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';

	let email = '';
	let message = '';

	function handleSubmit() {
		console.log('Support form submitted:', { email, message });
	}
</script>

<div class="container grid gap-6">
	<Card.Root class="w-full">
		<Card.Header>
			<h2 class="text-lg font-semibold">Contact Support</h2>
			<p class="text-sm text-gray-600">
				We're here to help you. Please provide details about your issue or request.
			</p>
		</Card.Header>

		<Card.Content>
			<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
				<Input
					type="email"
					placeholder="Your email address"
					bind:value={email}
					required
					class="w-full"
				/>

				<Textarea
					placeholder="Describe your issue or request"
					bind:value={message}
					required
					rows={5}
					class="w-full"
				/>

				<div class="flex flex-col gap-2">
					<label for="attachments" class="text-sm font-medium text-gray-700"
						>Attach files (optional)</label
					>
					<Input type="file" id="attachments" />
				</div>

				<Button type="submit">Submit</Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
