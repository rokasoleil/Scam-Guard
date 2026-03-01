import { Info, AlertCircle, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

interface DomainAnalysisProps {
  detectedDomain: string;
  expectedDomain?: string;
  explanation: string;
  isVerified: boolean;
}

export function DomainAnalysis({ 
  detectedDomain, 
  expectedDomain, 
  explanation,
  isVerified 
}: DomainAnalysisProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-5 space-y-4 relative overflow-hidden" style={{ boxShadow: '0px 4px 16px rgba(15, 23, 42, 0.08)' }}>
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
      
      <div className="flex items-start justify-between gap-2 relative z-10">
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold text-[#0F172A]/50 mb-1.5 uppercase tracking-wider">Detected Domain</div>
          <div className="font-bold text-[#0F172A] break-all text-base">
            {detectedDomain}
          </div>
        </div>
        {!isVerified && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {!isVerified && expectedDomain && (
        <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] rounded-2xl p-4 border border-[#EF4444]/20 relative z-10" style={{ boxShadow: '0 2px 8px rgba(239, 68, 68, 0.1)' }}>
          <div className="flex items-start gap-2 mb-4">
            <div className="flex-1">
              <div className="text-xs font-bold text-[#0F172A] mb-1 tracking-tight">
                Domain Mismatch Detected
              </div>
              <div className="text-[11px] text-[#0F172A]/70 leading-relaxed">
                This link claims to be one site but leads to another
              </div>
            </div>
            
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="w-6 h-6 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-[#EF4444] hover:text-[#991B1B] transition-all shadow-sm"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
              
              {showTooltip && (
                <div className="absolute right-0 top-8 w-56 bg-[#0F172A] text-white text-xs rounded-2xl p-3 shadow-xl z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="absolute -top-1.5 right-4 w-3 h-3 bg-[#0F172A] rotate-45"></div>
                  This link doesn't match the official domain. It could be impersonating a trusted source.
                </div>
              )}
            </div>
          </div>

          {/* Domain Comparison */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="text-xs text-[#0F172A]/60 font-semibold w-28 flex-shrink-0">Official domain:</div>
              <div className="text-xs font-bold text-[#166534] bg-white px-3 py-2 rounded-xl border border-[#22C55E]/30 shadow-sm">
                {expectedDomain}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-[#0F172A]/60 font-semibold w-28 flex-shrink-0">Detected domain:</div>
              <div className="text-xs font-bold text-[#EF4444] bg-white px-3 py-2 rounded-xl border border-[#EF4444]/40 break-all shadow-sm">
                {detectedDomain}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-sm text-[#0F172A]/70 leading-relaxed relative z-10">
        {explanation}
      </div>
    </div>
  );
}