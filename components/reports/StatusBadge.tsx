interface StatusBadgeProps {
  status: 'Pending' | 'Progress' | 'Resolved';
  className?: string;
}

const statusStyles = {
  Pending: 'bg-amber-100 text-amber-800',
  Progress: 'bg-blue-100 text-blue-800',
  Resolved: 'bg-green-100 text-green-800'
} as const;

const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => (
  <span 
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]} ${className}`}
  >
    Status: {status}
  </span>
);

export default StatusBadge;