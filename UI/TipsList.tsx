import { AlertTriangle, Shield, X } from 'lucide-react';

interface PhishingAlertProps {
  type: 'danger' | 'warning' | 'safe';
  title: string;
  description: string;
  onClose?: () => void;
}

export function PhishingAlert({ type, title, description, onClose }: PhishingAlertProps) {
  const styles = {
    danger: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    safe: 'bg-green-50 border-green-200 text-green-800',
  };

  const icons = {
    danger: <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    safe: <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />,
  };

  return (
    <div className={`flex gap-3 p-3 rounded-lg border ${styles[type]}`}>
      {icons[type]}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs mt-1 opacity-90">{description}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="flex-shrink-0">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
