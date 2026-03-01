import { LucideIcon } from 'lucide-react';

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  severity?: 'info' | 'warning';
}

export function InsightCard({ 
  icon: Icon, 
  title, 
  description, 
  severity = 'info' 
}: InsightCardProps) {
  const styles = {
    info: {
      bg: 'bg-[#EFF6FF]',
      iconBg: 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB]',
      iconColor: 'text-white',
      titleColor: 'text-[#0F172A]',
    },
    warning: {
      bg: 'bg-[#FEF2F2]',
      iconBg: 'bg-gradient-to-br from-[#EF4444] to-[#DC2626]',
      iconColor: 'text-white',
      titleColor: 'text-[#EF4444]',
    },
  };

  const style = styles[severity];

  return (
    <div className={`${style.bg} rounded-2xl p-4 flex gap-3.5 relative overflow-hidden`} style={{ boxShadow: '0px 4px 12px rgba(15, 23, 42, 0.06)' }}>
      <div className={`w-9 h-9 rounded-xl ${style.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
        <Icon className={`w-4.5 h-4.5 ${style.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-bold ${style.titleColor} mb-1.5`}>
          {title}
        </div>
        <div className="text-xs text-[#0F172A]/70 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
}