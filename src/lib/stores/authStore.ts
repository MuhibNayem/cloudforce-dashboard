import type { User } from '$lib/types/user';
import { writable } from 'svelte/store';

const createUser = () => {
	const { subscribe, set, update } = writable<User | null>(null);

	return {
		subscribe,
		setUser: (user: User) => update((prev) => ({ ...prev, ...user })),
		reset: () => set(null)
	};
};

export const userStore = createUser();
