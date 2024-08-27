<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import QRCode from 'qrcode';

	let twoFactorEnabled = false;
	let otpPhoneEnabled = false;
	let otpEmailEnabled = false;
	let authenticatorAppEnabled = false;
	let authenticatorSetupCompleted = false;
	let qrCodeDataUrl = '';
	let phoneNumber = '';
	let emailAddress = '';

	let currentPassword = '';
	let newPassword = '';
	let confirmPassword = '';

	function handlePasswordChange() {
		if (newPassword === confirmPassword) {
			console.log('Password change submitted:', { currentPassword, newPassword });
		} else {
			console.error('Passwords do not match');
		}
	}

	function handleEnableTwoFactor() {
		twoFactorEnabled = !twoFactorEnabled;
		if (!twoFactorEnabled) {
			otpPhoneEnabled = false;
			otpEmailEnabled = false;
			authenticatorAppEnabled = false;
		}
	}

	function handleAuthenticatorSetup() {
		authenticatorSetupCompleted = true;
		console.log('Authenticator app setup completed');
	}

	function handleSavePhoneNumber() {
		console.log('Phone number saved:', phoneNumber);
	}

	function handleSaveEmailAddress() {
		console.log('Email address saved:', emailAddress);
	}

	async function generateQRCode() {
		const secret = 'JBSWY3DPEHPK3PXP';
		const otpAuthUrl = `otpauth://totp/cloudforce?secret=${secret}&issuer=cloudforce`;

		qrCodeDataUrl = await QRCode.toDataURL(otpAuthUrl);
	}

	$: if (authenticatorAppEnabled && !authenticatorSetupCompleted) {
		generateQRCode();
	}
</script>

<div class=" container grid gap-6 overflow-scroll">
	<Card.Root>
		<Card.Header>
			<h2 class="text-xl font-semibold">Two-Factor Authentication</h2>
			<p class="text-sm text-gray-500">Manage your two-factor authentication methods.</p>
		</Card.Header>
		<Card.Content>
			<div class="mb-4 flex items-center space-x-2">
				<Switch id="twoFactorEnabled" checked={twoFactorEnabled} on:click={handleEnableTwoFactor} />
				<Label for="twoFactorEnabled" class="text-sm font-medium">
					Enable Two-Factor Authentication
				</Label>
			</div>

			{#if twoFactorEnabled}
				<!-- OTP via Phone -->
				<div class="mt-4">
					<div class="mb-2 flex items-center justify-between">
						<div>
							<h3 class="text-lg font-semibold">OTP via Phone</h3>
							<p class="text-sm text-gray-500">
								{otpPhoneEnabled
									? 'OTP will be sent to your phone number.'
									: 'Use OTP sent to your phone as a second authentication factor.'}
							</p>
						</div>
						<Switch
							id="otpPhoneEnabled"
							checked={otpPhoneEnabled}
							on:click={() => (otpPhoneEnabled = !otpPhoneEnabled)}
						/>
					</div>
					{#if otpPhoneEnabled}
						<div class="mb-4">
							<label for="phone-number" class="block text-sm font-medium text-gray-700">
								Phone Number
							</label>
							<Input type="tel" id="phone-number" bind:value={phoneNumber} />
							<Button on:click={handleSavePhoneNumber} class="mt-2">Save Phone Number</Button>
						</div>
					{/if}
				</div>

				<!-- OTP via Email -->
				<div class="mt-4">
					<div class="mb-2 flex items-center justify-between">
						<div>
							<h3 class="text-lg font-semibold">OTP via Email</h3>
							<p class="text-sm text-gray-500">
								{otpEmailEnabled
									? 'OTP will be sent to your email address.'
									: 'Use OTP sent to your email as a second authentication factor.'}
							</p>
						</div>
						<Switch
							id="otpEmailEnabled"
							checked={otpEmailEnabled}
							on:click={() => (otpEmailEnabled = !otpEmailEnabled)}
						/>
					</div>
					{#if otpEmailEnabled}
						<div class="mb-4">
							<label for="email-address" class="block text-sm font-medium text-gray-700">
								Email Address
							</label>
							<Input type="email" id="email-address" bind:value={emailAddress} />
							<Button on:click={handleSaveEmailAddress} class="mt-2">Save Email Address</Button>
						</div>
					{/if}
				</div>

				<!-- Authenticator App -->
				<div class="mt-4">
					<div class="mb-2 flex items-center justify-between">
						<div>
							<h3 class="text-lg font-semibold">Authenticator App</h3>
							<p class="text-sm text-gray-500">
								{authenticatorAppEnabled
									? authenticatorSetupCompleted
										? 'Authenticator app is configured.'
										: 'Please complete the setup process.'
									: 'Use an authenticator app for two-factor authentication.'}
							</p>
						</div>
						<Switch
							id="authenticatorAppEnabled"
							checked={authenticatorAppEnabled}
							on:click={() => (authenticatorAppEnabled = !authenticatorAppEnabled)}
						/>
					</div>
					{#if authenticatorAppEnabled && !authenticatorSetupCompleted}
						<div class="mb-4">
							<p class="text-sm text-gray-500">
								To use an authenticator app, scan the QR code or enter the key provided.
							</p>
							<div class=" mb-4 flex flex-row items-center justify-center rounded bg-gray-100 p-4">
								{#if qrCodeDataUrl}
									<img src={qrCodeDataUrl} alt="QR Code" />
								{/if}
							</div>
							<Button on:click={handleAuthenticatorSetup}>Complete Setup</Button>
						</div>
					{/if}
				</div>
			{/if}
		</Card.Content>
	</Card.Root>

	<Card.Root class="mt-6">
		<Card.Header>
			<h2 class="text-xl font-semibold">Change Password</h2>
		</Card.Header>
		<Card.Content>
			<div class="mb-4">
				<label for="current-password" class="block text-sm font-medium text-gray-700">
					Current Password
				</label>
				<Input type="password" id="current-password" bind:value={currentPassword} />
			</div>
			<div class="mb-4">
				<label for="new-password" class="block text-sm font-medium text-gray-700">
					New Password
				</label>
				<Input type="password" id="new-password" bind:value={newPassword} />
			</div>
			<div class="mb-4">
				<label for="confirm-password" class="block text-sm font-medium text-gray-700">
					Confirm New Password
				</label>
				<Input type="password" id="confirm-password" bind:value={confirmPassword} />
			</div>
		</Card.Content>
		<Card.Footer>
			<Button on:click={handlePasswordChange}>Change Password</Button>
		</Card.Footer>
	</Card.Root>
</div>
