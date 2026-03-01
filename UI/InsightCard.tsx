import { useState } from 'react';
import { Shield, Link2, AlertCircle } from 'lucide-react';
import { PhishTellLogo } from './components/PhishTellLogo';
import { RiskIndicator } from './components/RiskIndicator';
import { DomainAnalysis } from './components/DomainAnalysis';
import { ActionButtons } from './components/ActionButtons';
import { InsightCard } from './components/InsightCard';
import { TechnicalDetails } from './components/TechnicalDetails';

export default function App() {
  // Mock data - in real implementation, this would come from the backend API
  const [analysisData] = useState({
    riskScore: 78,
    riskLevel: 'high' as const,
    detectedDomain: 'queesnu-verify.tk',
    expectedDomain: 'queensu.ca',
    isVerified: false,
    explanation: 'This link asks you to verify your login. Take a second to double-check the domain before entering any credentials.',
    insights: [
      {
        title: 'Impersonation risk detected',
        description: 'The link uses a similar-looking domain but isn\'t the official queensu.ca address.',
        severity: 'warning' as const,
      },
      {
        title: 'Suspicious login verification request',
        description: 'We noticed something unusual. Legitimate services rarely ask you to re-verify via email links.',
        severity: 'warning' as const,
      },
    ],
    riskBreakdown: [
      { label: 'Domain mismatch', percentage: 40 },
      { label: 'Login keyword detected', percentage: 20 },
      { label: 'Suspicious TLD (.tk)', percentage: 18 },
    ],
  });

  const handleGoBack = () => {
    console.log('User chose to go back to safety');
    // In real implementation: close popup, prevent navigation
  };

  const handleProceed = () => {
    console.log('User chose to proceed anyway');
    // In real implementation: log decision, allow navigation with warning
  };

  const handleCopyLink = () => {
    console.log('Copied link to clipboard');
    // In real implementation: copy the suspicious link
  };

  const handleReportScam = () => {
    console.log('User reported as scam');
    // In real implementation: send report to backend
  };

  return (
    <div className="w-[380px] bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA] px-5 py-5 border-b border-white/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-16 -mb-16"></div>
        <div className="relative z-10">
          <PhishTellLogo />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Risk Indicator */}
        <div className="bg-white rounded-2xl p-6 relative overflow-hidden" style={{ boxShadow: '0px 6px 20px rgba(15, 23, 42, 0.08)' }}>
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>
          <RiskIndicator 
            riskScore={analysisData.riskScore} 
            riskLevel={analysisData.riskLevel} 
          />
        </div>

        {/* Domain Analysis */}
        <DomainAnalysis
          detectedDomain={analysisData.detectedDomain}
          expectedDomain={analysisData.expectedDomain}
          explanation={analysisData.explanation}
          isVerified={analysisData.isVerified}
        />

        {/* Insights */}
        <div className="space-y-3">
          {analysisData.insights.map((insight, index) => (
            <InsightCard
              key={index}
              icon={insight.severity === 'warning' ? AlertCircle : Shield}
              title={insight.title}
              description={insight.description}
              severity={insight.severity}
            />
          ))}
        </div>

        {/* Technical Details */}
        <TechnicalDetails
          breakdown={analysisData.riskBreakdown}
        />

        {/* Actions */}
        <div className="space-y-4">
          {/* Primary Action */}
          <button
            onClick={handleGoBack}
            className="w-full bg-[#2563EB] text-white font-bold py-4 px-6 rounded-xl 
                       hover:bg-[#1D4ED8] active:scale-[0.98] transition-all duration-200 
                       shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 text-sm"
          >
            Go Back to Safety
          </button>

          {/* Secondary Action */}
          <button
            onClick={handleProceed}
            style={{ 
              borderColor: '#CBD5E1', 
              color: analysisData.riskLevel === 'high' ? '#EF4444' : '#64748B'
            }}
            className="w-full bg-white border font-bold py-3.5 px-6 rounded-xl 
                       hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 
                       flex items-center justify-center gap-2.5 text-sm"
          >
            Proceed Anyway
          </button>

          {/* Utility Actions */}
          <div className="flex items-center justify-center gap-8 pt-2">
            <button
              onClick={handleCopyLink}
              className="text-xs text-[#64748B] hover:text-[#2563EB] font-medium 
                         flex items-center gap-1.5 transition-colors underline"
            >
              Copy Link
            </button>
            <button
              onClick={handleReportScam}
              className="text-xs text-[#64748B] hover:text-[#EF4444] font-medium 
                         flex items-center gap-1.5 transition-colors underline"
            >
              Report Scam
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-center text-[#0F172A]/50 font-medium pt-2">
          Always verify unexpected requests.
        </div>
      </div>
    </div>
  );
}