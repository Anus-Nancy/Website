'use client';

import { FormEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { api } from '../lib/api';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', { autoConnect: false });

export function ChatPanel({ requestId }: { requestId: string }) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.connect();
    socket.emit('join:request', requestId);
    socket.on('chat:message', (message) => setMessages((prev) => [...prev, message]));
    api(`/api/chat/${requestId}`).then((d) => setMessages(d.messages)).catch(() => undefined);
    return () => {
      socket.emit('leave:request', requestId);
      socket.off('chat:message');
      socket.disconnect();
    };
  }, [requestId]);

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const text = String(form.get('text') || '');
    if (!text) return;
    const { message } = await api(`/api/chat/${requestId}`, { method: 'POST', body: JSON.stringify({ text }) });
    setMessages((prev) => [...prev, message]);
    e.currentTarget.reset();
  }

  return <div className="card"><h3 className="mb-3 text-lg font-semibold">Realtime Chat</h3><div className="mb-3 h-52 space-y-2 overflow-y-auto">{messages.map((m) => <p key={m.id} className="rounded-xl bg-slate-100 p-2 text-sm">{m.text}</p>)}</div><form onSubmit={send} className="flex gap-2"><input name="text" className="flex-1 rounded-xl border p-2" placeholder="Type message" /><button className="rounded-xl bg-brand-500 px-3 text-white">Send</button></form></div>;
}
