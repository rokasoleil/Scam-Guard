import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface RiskBreakdownItem {
  label: string;
  percentage: number;
}

interface TechnicalDetailsProps {
  breakdown: RiskBreakdownItem[];
}

export function TechnicalDetails({ breakdown }: TechnicalDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-3">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs text-[#64748B] hover:text-[#2563EB] font-medium 
                   flex items-center gap-1.5 transition-colors mx-auto"
      >
        See technical details
        {isExpanded ? (
          <ChevronUp className="w-3.5 h-3.5" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="bg-[#EFF6FF] rounded-2xl p-4 space-y-3" style={{ boxShadow: '0px 4px 12px rgba(15, 23, 42, 0.06)' }}>
          <div className="text-xs font-bold text-[#0F172A] mb-2">
            Risk Breakdown:
          </div>
          <div className="space-y-2.5">
            {breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-xs text-[#0F172A]/70">
                  {item.label}
                </span>
                <span className="text-xs font-bold text-[#2563EB]">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
