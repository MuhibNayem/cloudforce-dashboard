<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
</script>

<div class="container grid gap-6">
	<!-- Platform Name Setting -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Platform Name</Card.Title>
			<Card.Description
				>Set the name of your e-learning platform as it will appear to users.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<form>
				<Input placeholder="Platform Name" />
			</form>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button>Save</Button>
		</Card.Footer>
	</Card.Root>

	<!-- Course Directory Setting -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Course Directory</Card.Title>
			<Card.Description>
				Specify the directory where your course files and resources are stored.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex flex-col gap-4">
				<Input placeholder="Course Directory" value="/content/courses" />
				<div class="flex items-center space-x-2">
					<Checkbox id="allow-directory-change" checked={true} />
					<label
						for="allow-directory-change"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Allow administrators to change the course directory.
					</label>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button>Save</Button>
		</Card.Footer>
	</Card.Root>

	<!-- User Permissions -->
	<Card.Root>
		<Card.Header>
			<Card.Title>User Permissions</Card.Title>
			<Card.Description>Manage default permissions for users on the platform.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex flex-col gap-4">
				<div class="flex items-center space-x-2">
					<Checkbox id="allow-course-creation" checked={true} />
					<label
						for="allow-course-creation"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Allow users to create new courses.
					</label>
				</div>
				<div class="flex items-center space-x-2">
					<Checkbox id="allow-content-upload" checked={true} />
					<label
						for="allow-content-upload"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Allow users to upload content to courses.
					</label>
				</div>
				<div class="flex items-center space-x-2">
					<Checkbox id="allow-forum-access" checked={true} />
					<label
						for="allow-forum-access"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Allow users to access and participate in forums.
					</label>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button>Save</Button>
		</Card.Footer>
	</Card.Root>

	<!-- Profile Settings -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Profile Settings</Card.Title>
			<Card.Description>Manage your personal information and visibility settings.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex flex-col gap-4">
				<Input placeholder="Username" />
				<Input placeholder="Email" />
				<div class="flex items-center space-x-2">
					<Checkbox id="profile-visibility" checked={true} />
					<label
						for="profile-visibility"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Make my profile visible to others.
					</label>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button>Save</Button>
		</Card.Footer>
	</Card.Root>

	<!-- Notification Settings -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Notification Settings</Card.Title>
			<Card.Description>Control how you receive notifications from the platform.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex flex-col gap-4">
				<div class="flex items-center space-x-2">
					<Checkbox id="email-notifications" checked={true} />
					<label
						for="email-notifications"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Receive email notifications.
					</label>
				</div>
				<div class="flex items-center space-x-2">
					<Checkbox id="sms-notifications" />
					<label
						for="sms-notifications"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Receive SMS notifications.
					</label>
				</div>
				<div class="flex items-center space-x-2">
					<Checkbox id="push-notifications" checked={true} />
					<label
						for="push-notifications"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Receive push notifications.
					</label>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button>Save</Button>
		</Card.Footer>
	</Card.Root>

	<!-- Privacy Settings -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Privacy Settings</Card.Title>
			<Card.Description>Manage your data sharing and privacy preferences.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex flex-col gap-4">
				<div class="flex items-center space-x-2">
					<Checkbox id="data-sharing" />
					<label
						for="data-sharing"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Allow data sharing with third-party services.
					</label>
				</div>
				<div class="flex items-center space-x-2">
					<Checkbox id="ad-personalization" checked={true} />
					<label
						for="ad-personalization"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Enable personalized ads.
					</label>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button>Save</Button>
		</Card.Footer>
	</Card.Root>
</div>
