import { auth, currentUser } from '@clerk/nextjs/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export async function syncCurrentUser(): Promise<void> {
	try {
		const { getToken } = await auth();
		const token = await getToken();

		if (!token) return;

		const user = await currentUser();
		if (!user) return;

		const primaryEmail = user.emailAddresses.find(
			(e) => e.id === user.primaryEmailAddressId,
		)?.emailAddress ?? user.emailAddresses[0]?.emailAddress;

		if (!primaryEmail) return;

		const name =
			[user.firstName, user.lastName].filter(Boolean).join(' ') ||
			primaryEmail.split('@')[0];

		await fetch(`${API_URL}/users/sync`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ name, email: primaryEmail }),
			cache: 'no-store',
		});
	} catch (err) {
		console.error('[syncCurrentUser] Error al sincronizar usuario:', err);
	}
}
