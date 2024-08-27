<script lang="ts">
	import { goto } from '$app/navigation';
	import { Icons } from '$lib';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { useToast } from '$lib/hooks/useToast';
	import { post } from '$lib/services/axios';
	import { cn } from '$lib/utils.js';
	import type { AxiosError } from 'axios';
	import { beforeUpdate } from 'svelte';

	let isLoading = false;
	let isGithubLoading = false;
	let showPassword = false;
	let showConfirmPassword = false;
	let email = '';
	let password = '';
	let confirmPassword = '';
	let firstName = '';
	let lastName = '';

	const { showErrorToast } = useToast();

	beforeUpdate(() => {
		const authenticated = JSON.parse(localStorage.getItem('authenticated') ?? '{}');
		if (authenticated && typeof authenticated !== 'object') {
			goto('/');
		}
	});

	const onRegister = async () => {
		isLoading = true;
		try {
			const response = await post(`http://localhost:8000/api/v1/auth/register`, {
				email,
				password,
				firstName,
				lastName
			});
			if (response?.data) {
				goto('/login');
			}
		} catch (error) {
			const axiosError = error as unknown as AxiosError;
			showErrorToast('failed', axiosError?.response?.statusText);
			console.error(error);
		} finally {
			isLoading = false;
		}
	};

	const onGithubSubmit = async () => {
		isGithubLoading = true;

		setTimeout(() => {
			isGithubLoading = false;
		}, 3000);
	};

	const onShowOrHidePassword = () => {
		showPassword = !showPassword;
	};

	const onShowOrHideConfirmPassword = () => {
		showPassword = !showPassword;
	};
</script>

<div class="relative flex h-[125vh] items-center justify-between overflow-scroll">
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
		/>
		<div class="relative z-20 flex items-center text-lg font-medium">Cloud Force</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;Cloud Force – Where Dreams Turn into Reality. Our platform guides you in selecting
					the perfect career path and provides the training you need to excel. Let us help you
					achieve your dream career with personalized support and expert guidance.&rdquo;
				</p>
				<footer class="text-sm">- InNeed Intelligent Cloud</footer>
			</blockquote>
		</div>
	</div>
	<div class="m-2 p-2 lg:p-8">
		<div class="mx-auto mt-6 flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="mb-2 mt-6 flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create your account</h1>
				<p class="text-sm text-muted-foreground">
					Enter your information below to create your account
				</p>
			</div>

			<div class={cn('grid gap-6')}>
				<form>
					<div class="grid gap-2">
						<div class="grid gap-1">
							<Label for="firstName">First Name</Label>
							<Input
								id="firstName"
								placeholder="John"
								type="text"
								autocapitalize="none"
								autocorrect="off"
								bind:value={firstName}
								disabled={isLoading}
							/>
							<p class="text-sm text-muted-foreground">Enter your first name</p>
						</div>

						<div class="grid gap-1">
							<Label for="lastName">Last Name</Label>
							<Input
								id="lastName"
								placeholder="doe"
								type="text"
								autocapitalize="none"
								autocorrect="off"
								bind:value={lastName}
								disabled={isLoading}
							/>
							<p class="text-sm text-muted-foreground">Enter your last name</p>
						</div>

						<div class="grid gap-1">
							<Label for="email">Email</Label>
							<Input
								id="email"
								placeholder="name@example.com"
								type="email"
								autocapitalize="none"
								autocomplete="email"
								autocorrect="off"
								bind:value={email}
								disabled={isLoading}
							/>
							<p class="text-sm text-muted-foreground">Enter your email address</p>
						</div>

						<div class="grid gap-1">
							<Label for="password">Password</Label>
							<div class="flex w-full max-w-sm items-center space-x-2">
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									autocapitalize="none"
									autocorrect="off"
									disabled={isLoading}
									bind:value={password}
								/>
								<Button on:click={onShowOrHidePassword}>
									{#if showPassword}
										<Icons.eye class=" h-4 w-4 " />
									{:else}
										<Icons.eyeOff class="h-4 w-4" />
									{/if}
								</Button>
							</div>

							<p class="text-sm text-muted-foreground">Enter your password</p>
						</div>

						<div class="grid gap-1">
							<Label for="password">Confirm Password</Label>
							<div class="flex w-full max-w-sm items-center space-x-2">
								<Input
									id="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									autocapitalize="none"
									autocorrect="off"
									disabled={isLoading}
									bind:value={confirmPassword}
								/>
								<Button on:click={onShowOrHideConfirmPassword}>
									{#if showConfirmPassword}
										<Icons.eye class=" h-4 w-4 " />
									{:else}
										<Icons.eyeOff class="h-4 w-4" />
									{/if}
								</Button>
							</div>

							<p class="text-sm text-muted-foreground">Confirm your password</p>
						</div>
						<Button on:click={onRegister} disabled={isLoading}>
							{#if isLoading}
								<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Register
						</Button>
					</div>
					<p class="mt-6 text-center text-sm text-muted-foreground">
						Already have an account ? <a
							href="/login"
							class=" underline underline-offset-4 hover:text-primary">Login</a
						>
					</p>
				</form>

				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t" />
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
					</div>
				</div>
				<Button
					variant="outline"
					type="button"
					disabled={isGithubLoading}
					on:click={onGithubSubmit}
				>
					{#if isGithubLoading}
						<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
					{:else}
						<Icons.gitHub class="mr-2 h-4 w-4" />
					{/if}
					GitHub
				</Button>
			</div>
			<p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</a>
				and
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>
