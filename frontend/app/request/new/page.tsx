'use client';

import { FormEvent, useState } from 'react';
import { api } from '../../../lib/api';

export default function NewRequestPage() {
  const [message, setMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await api('/api/requests', {
      method: 'POST',
      body: JSON.stringify({
        title: form.get('title'),
        description: form.get('description'),
        category: form.get('category'),
        location: form.get('location'),
        imageUrls: [form.get('imageUrl')],
        schedule: new Date(String(form.get('schedule'))).toISOString()
      })
    });
    setMessage('Request created successfully.');
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-2xl space-y-3">
      <h1 className="text-2xl font-bold">Create Service Request</h1>
      <input name="title" placeholder="Title" className="w-full rounded-xl border p-3" />
      <textarea name="description" placeholder="Description" className="w-full rounded-xl border p-3" />
      <div className="grid gap-3 md:grid-cols-2">
        <input name="category" placeholder="Category" className="rounded-xl border p-3" />
        <input name="location" placeholder="Location" className="rounded-xl border p-3" />
        <input name="imageUrl" placeholder="Image URL" className="rounded-xl border p-3" />
        <input name="schedule" type="datetime-local" className="rounded-xl border p-3" />
      </div>
      <button className="rounded-xl bg-brand-500 px-5 py-3 text-white">Submit Request</button>
      {message && <p className="text-emerald-700">{message}</p>}
    </form>
  );
}
