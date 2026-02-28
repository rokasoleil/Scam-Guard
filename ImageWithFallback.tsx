interface RiskIndicatorProps {
  riskScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high';
}

export function RiskIndicator({ riskScore, riskLevel }: RiskIndicatorProps) {
  const config = {
    low: {
      color: '#22C55E',
      label: 'LOW RISK',
      bgColor: '#F0FDF4',
      textColor: '#166534',
      gradient: 'from-green-500 to-emerald-500',
    },
    medium: {
      color: '#FACC15',
      label: 'MEDIUM RISK',
      bgColor: '#FEFCE8',
      textColor: '#854D0E',
      gradient: 'from-yellow-400 to-amber-500',
    },
    high: {
      color: '#EF4444',
      label: 'HIGH RISK',
      bgColor: '#FEF2F2',
      textColor: '#EF4444',
      gradient: 'from-red-500 to-red-600',
    },
  };

  const { color, label, bgColor, textColor, gradient } = config[riskLevel];
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (riskScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-36 h-36">
        {/* Outer glow ring */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-xl`}></div>
        
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90 relative z-10">
          <circle
            cx="72"
            cy="72"
            r="45"
            stroke="#E5E7EB"
            strokeWidth="10"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="72"
            cy="72"
            r="45"
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
            style={{ filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))' }}
          />
        </svg>
        
        {/* Center content - only percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[10px] text-[#0F172A]/50 font-semibold uppercase tracking-wider mb-2">Risk Level</div>
          <div className={`text-[28px] font-black text-transparent bg-clip-text bg-gradient-to-br ${gradient} leading-none`}>
            {riskScore}%
          </div>
        </div>
      </div>

      {/* Risk label badge - placed outside the circle */}
      <div 
        className="px-5 py-2.5 rounded-full font-bold text-[13px] uppercase tracking-wider shadow-lg"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          letterSpacing: '0.08em',
          boxShadow: `0 4px 12px ${color}20`
        }}
      >
        {label}
      </div>
    </div>
  );
}