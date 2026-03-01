import { CheckCircle2 } from 'lucide-react';

const tips = [
  'Check the sender\'s email address carefully',
  'Hover over links before clicking (don\'t click suspicious ones)',
  'Look for spelling and grammar mistakes',
  'Be wary of urgent or threatening language',
  'Never share passwords or personal info via email',
  'When in doubt, contact the company directly'
];

export function TipsList() {
  return (
    <div className="space-y-2">
      <div className="font-semibold text-sm text-gray-900">How to Stay Safe:</div>
      <div className="space-y-1.5">
        {tips.map((tip, index) => (
          <div key={index} className="flex gap-2 items-start">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-700">{tip}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
