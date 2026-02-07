import clsx from 'clsx';

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'rounded-full px-3 py-1 text-xs font-semibold',
        status === 'COMPLETED' && 'bg-emerald-100 text-emerald-700',
        status === 'IN_PROGRESS' && 'bg-blue-100 text-blue-700',
        status === 'ACCEPTED' && 'bg-sky-100 text-sky-700',
        status === 'PENDING' && 'bg-amber-100 text-amber-700'
      )}
    >
      {status.replace('_', ' ')}
    </span>
  );
}
