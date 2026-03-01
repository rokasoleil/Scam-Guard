import { ArrowLeft, ExternalLink, Copy, Flag } from 'lucide-react';

interface ActionButtonsProps {
  riskLevel: 'low' | 'medium' | 'high';
  onGoBack: () => void;
  onProceed: () => void;
  onCopyLink: () => void;
  onReportScam: () => void;
}

export function ActionButtons({ 
  riskLevel, 
  onGoBack, 
  onProceed, 
  onCopyLink, 
  onReportScam 
}: ActionButtonsProps) {
  const proceedColor = riskLevel === 'high' ? '#EF4444' : '#64748B';

  return (
    <div className="space-y-4">
      {/* Primary Action */}
      <button
        onClick={onGoBack}
        className="w-full bg-[#DBEAFE] text-[#2563EB] font-bold py-4 px-6 rounded-xl 
                   hover:bg-[#BFDBFE] active:scale-[0.98] transition-all duration-200 
                   shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 text-sm"
      >
        <ArrowLeft className="w-5 h-5" />
        Go Back to Safety
      </button>

      {/* Secondary Action */}
      <button
        onClick={onProceed}
        style={{ 
          borderColor: '#CBD5E1', 
          color: proceedColor 
        }}
        className="w-full bg-white border font-bold py-3.5 px-6 rounded-xl 
                   hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 
                   flex items-center justify-center gap-2.5 text-sm"
      >
        Proceed Anyway
        <ExternalLink className="w-4 h-4" />
      </button>

      {/* Utility Actions */}
      <div className="flex items-center justify-center gap-8 pt-2">
        <button
          onClick={onCopyLink}
          className="text-xs text-[#64748B] hover:text-[#2563EB] font-medium 
                     flex items-center gap-1.5 transition-colors underline"
        >
          Copy Link
        </button>
        <button
          onClick={onReportScam}
          className="text-xs text-[#64748B] hover:text-[#EF4444] font-medium 
                     flex items-center gap-1.5 transition-colors underline"
        >
          Report Scam
        </button>
      </div>
    </div>
  );
}