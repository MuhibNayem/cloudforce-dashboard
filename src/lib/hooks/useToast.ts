import { toast } from 'svelte-sonner';

export function useToast() {
	const showToast = (message: string, type: 'success' | 'error', description: string = '') => {
		const toastId = toast[type](message, {
			description,

			cancel: {
				label: 'Close',
				onClick: () => toast.dismiss(toastId)
			}
		});
		return toastId;
	};

	const showSuccessToast = (message: string, description: string = '') => {
		return showToast(message, 'success', description);
	};

	const showErrorToast = (message: string, description: string = '') => {
		return showToast(message, 'error', description);
	};

	return { showSuccessToast, showErrorToast };
}
