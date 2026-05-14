const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

type RequestOptions = Omit<RequestInit, 'body'> & {
	body?: unknown;
};

export async function apiFetch<T = unknown>(
	path: string,
	token: string | null,
	opts: RequestOptions = {},
): Promise<T> {
	const { body, ...rest } = opts;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(rest.headers as Record<string, string>),
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const response = await fetch(`${API_URL}${path}`, {
		...rest,
		headers,
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: response.statusText }));
		throw new ApiError(response.status, error?.message ?? response.statusText);
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return response.json() as Promise<T>;
}

export class ApiError extends Error {
	constructor(
		public readonly status: number,
		message: string,
	) {
		super(message);
		this.name = 'ApiError';
	}
}

export async function apiGet<T>(path: string, token: string | null): Promise<T> {
	return apiFetch<T>(path, token, { method: 'GET' });
}

export async function apiPost<T>(path: string, token: string | null, body: unknown): Promise<T> {
	return apiFetch<T>(path, token, { method: 'POST', body });
}

export async function apiPut<T>(path: string, token: string | null, body: unknown): Promise<T> {
	return apiFetch<T>(path, token, { method: 'PUT', body });
}

export async function apiDelete<T>(path: string, token: string | null): Promise<T> {
	return apiFetch<T>(path, token, { method: 'DELETE' });
}
