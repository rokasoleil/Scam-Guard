interface ThreatIndicatorProps {
  level: number; // 0-100
}

export function ThreatIndicator({ level }: ThreatIndicatorProps) {
  const getColor = () => {
    if (level >= 70) return 'bg-red-500';
    if (level >= 40) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getLabel = () => {
    if (level >= 70) return 'High Risk';
    if (level >= 40) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600 font-medium">Threat Level</span>
        <span className="font-bold text-gray-900">{getLabel()}</span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`absolute inset-y-0 left-0 ${getColor()} transition-all duration-500 rounded-full`}
          style={{ width: `${level}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 -mt-1">
        <span>Safe</span>
        <span>Dangerous</span>
      </div>
    </div>
  );
}
