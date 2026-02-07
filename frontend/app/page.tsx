import Link from 'next/link';

const steps = [
  { title: 'Post your need', desc: 'Describe your task, upload photos, and set your schedule.' },
  { title: 'Choose a pro', desc: 'Get matched with verified providers and compare offers.' },
  { title: 'Track & pay', desc: 'Follow live progress, chat instantly, and pay securely.' }
];

export default function HomePage() {
  return (
    <div className="space-y-8 py-8">
      <section className="card grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 inline-flex rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold">Trusted Home Services</p>
          <h1 className="text-4xl font-bold text-slate-900">Book local pros in minutes with FixIt Now.</h1>
          <p className="mt-4 text-slate-600">A premium marketplace for home repair, cleaning, plumbing, electrical and more.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/request/new" className="rounded-xl bg-brand-500 px-4 py-3 text-white">Request a Service</Link>
            <Link href="/dashboard/provider" className="rounded-xl border border-brand-500 px-4 py-3 text-brand-700">Become a Provider</Link>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-blue-100 to-emerald-100">
          <p className="text-sm text-slate-700">95% jobs matched within 10 minutes • Realtime support • Secure payments</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <article key={step.title} className="card">
            <p className="text-sm font-semibold text-brand-700">Step {i + 1}</p>
            <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
