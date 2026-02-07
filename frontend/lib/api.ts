const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function api(path: string, init?: RequestInit) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {})
    }
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed');
  return res.json();
}
