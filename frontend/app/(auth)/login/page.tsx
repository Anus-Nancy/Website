'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../../lib/api';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: form.get('email'), password: form.get('password') })
      });
      localStorage.setItem('token', data.token);
      router.push(`/dashboard/${data.user.role.toLowerCase()}`);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return <form onSubmit={onSubmit} className="card mx-auto mt-10 max-w-md space-y-4"><h2 className="text-2xl font-bold">Login</h2><input name="email" type="email" placeholder="Email" className="w-full rounded-xl border p-3" /><input name="password" type="password" placeholder="Password" className="w-full rounded-xl border p-3" /><button className="w-full rounded-xl bg-brand-500 p-3 text-white">Sign in</button>{error && <p className="text-sm text-red-600">{error}</p>}</form>;
}
