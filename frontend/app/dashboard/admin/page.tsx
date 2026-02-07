export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="card"><p className="text-xs uppercase text-slate-500">Users</p><p className="text-3xl font-bold">12,430</p></div>
        <div className="card"><p className="text-xs uppercase text-slate-500">Providers</p><p className="text-3xl font-bold">2,110</p></div>
        <div className="card"><p className="text-xs uppercase text-slate-500">Jobs</p><p className="text-3xl font-bold">7,921</p></div>
        <div className="card"><p className="text-xs uppercase text-slate-500">Revenue</p><p className="text-3xl font-bold">$182k</p></div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold">Control Panel</h2>
        <p className="text-sm text-slate-600">Verify providers, manage categories, review disputes and platform health.</p>
      </div>
    </div>
  );
}
