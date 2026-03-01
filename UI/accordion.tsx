import { AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';

type Status = 'safe' | 'suspicious' | 'dangerous';

interface StatusBadgeProps {
  status: Status;
  count?: number;
}

export function StatusBadge({ status, count }: StatusBadgeProps) {
  const config = {
    safe: {
      icon: ShieldCheck,
      text: 'Safe',
      bg: 'bg-green-500',
      textColor: 'text-green-50',
    },
    suspicious: {
      icon: ShieldAlert,
      text: 'Suspicious',
      bg: 'bg-amber-500',
      textColor: 'text-amber-50',
    },
    dangerous: {
      icon: AlertTriangle,
      text: 'Dangerous',
      bg: 'bg-red-500',
      textColor: 'text-red-50',
    },
  };

  const { icon: Icon, text, bg, textColor } = config[status];

  return (
    <div className={`${bg} ${textColor} px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold shadow-sm`}>
      <Icon className="w-4 h-4" />
      <span>{text}</span>
      {count !== undefined && (
        <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs font-bold">
          {count}
        </span>
      )}
    </div>
  );
}
