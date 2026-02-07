import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-brand-700">FixIt Now</Link>
        <nav className="flex gap-3 text-sm">
          <Link href="/dashboard/customer" className="rounded-xl px-3 py-2 hover:bg-brand-50">Customer</Link>
          <Link href="/dashboard/provider" className="rounded-xl px-3 py-2 hover:bg-brand-50">Provider</Link>
          <Link href="/dashboard/admin" className="rounded-xl px-3 py-2 hover:bg-brand-50">Admin</Link>
          <Link href="/request/new" className="rounded-xl bg-brand-500 px-3 py-2 text-white">Create Request</Link>
        </nav>
      </div>
    </header>
  );
}
