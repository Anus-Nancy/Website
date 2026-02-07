import { StatusBadge } from '../../../../components/StatusBadge';

export default function ProviderDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Provider Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><p className="text-sm text-slate-500">Today Jobs</p><p className="text-3xl font-bold">6</p></div>
        <div className="card"><p className="text-sm text-slate-500">Monthly Earnings</p><p className="text-3xl font-bold">$4,280</p></div>
        <div className="card"><p className="text-sm text-slate-500">Rating</p><p className="text-3xl font-bold">4.9</p></div>
      </div>
      <div className="card"><h2 className="mb-3 text-lg font-semibold">Assigned Jobs</h2><div className="flex items-center justify-between rounded-xl border p-3"><p>Bathroom fittings installation</p><StatusBadge status="ACCEPTED" /></div></div>
    </div>
  );
}
