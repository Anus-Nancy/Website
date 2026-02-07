import { StatusBadge } from '../../../../components/StatusBadge';
import { ChatPanel } from '../../../../components/ChatPanel';

const mock = [
  { id: 'req_1', title: 'Kitchen plumbing repair', status: 'IN_PROGRESS' },
  { id: 'req_2', title: 'AC servicing', status: 'PENDING' }
];

export default function CustomerDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Customer Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card space-y-3">
          <h2 className="text-lg font-semibold">Active Requests</h2>
          {mock.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border p-3">
              <p>{r.title}</p>
              <StatusBadge status={r.status} />
            </div>
          ))}
        </div>
        <ChatPanel requestId="req_1" />
      </div>
    </div>
  );
}
