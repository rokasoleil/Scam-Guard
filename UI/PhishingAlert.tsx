import { useState } from 'react';
import { Info } from 'lucide-react';

interface RedFlag {
  id: string;
  text: string;
  reason: string;
  severity: 'high' | 'medium';
}

const redFlags: RedFlag[] = [
  {
    id: 'sender',
    text: 'service-noreply@amaz0n-secure.net',
    reason: 'Suspicious domain - not the official Amazon email. Notice the "0" instead of "o" and unusual domain extension.',
    severity: 'high'
  },
  {
    id: 'urgency',
    text: 'URGENT: Your account will be suspended',
    reason: 'Creates false urgency to pressure you into acting without thinking.',
    severity: 'high'
  },
  {
    id: 'link',
    text: 'http://amaz0n-verify.tk/account',
    reason: 'Suspicious URL that doesn\'t match the company\'s official website. Uses a free .tk domain.',
    severity: 'high'
  },
  {
    id: 'grammar',
    text: 'We has detected suspicious activity',
    reason: 'Poor grammar and spelling errors are common in phishing emails.',
    severity: 'medium'
  }
];

export function EmailPreview() {
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);

  const getHighlightClass = (flagId: string) => {
    const flag = redFlags.find(f => f.id === flagId);
    if (selectedFlag === flagId) {
      return flag?.severity === 'high' 
        ? 'bg-red-200 cursor-pointer' 
        : 'bg-amber-200 cursor-pointer';
    }
    return flag?.severity === 'high' 
      ? 'bg-red-100 hover:bg-red-200 cursor-pointer' 
      : 'bg-amber-100 hover:bg-amber-200 cursor-pointer';
  };

  return (
    <div className="space-y-3">
      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-3 py-2">
          <div className="text-xs text-gray-500">From:</div>
          <div 
            className={`text-sm mt-1 inline-block rounded px-1 ${getHighlightClass('sender')}`}
            onClick={() => setSelectedFlag(selectedFlag === 'sender' ? null : 'sender')}
          >
            service-noreply@amaz0n-secure.net
          </div>
        </div>
        
        <div className="p-3 space-y-2">
          <div 
            className={`inline-block rounded px-1 font-semibold ${getHighlightClass('urgency')}`}
            onClick={() => setSelectedFlag(selectedFlag === 'urgency' ? null : 'urgency')}
          >
            URGENT: Your account will be suspended
          </div>
          
          <div className="text-sm text-gray-700 space-y-2">
            <p>Dear Customer,</p>
            <p>
              <span 
                className={`inline-block rounded px-1 ${getHighlightClass('grammar')}`}
                onClick={() => setSelectedFlag(selectedFlag === 'grammar' ? null : 'grammar')}
              >
                We has detected suspicious activity
              </span> on your account. Your account will be suspended within 24 hours if you don't verify your information.
            </p>
            <p>Click here to verify now:</p>
            <a 
              href="#"
              className={`inline-block rounded px-1 text-blue-600 underline ${getHighlightClass('link')}`}
              onClick={(e) => {
                e.preventDefault();
                setSelectedFlag(selectedFlag === 'link' ? null : 'link');
              }}
            >
              http://amaz0n-verify.tk/account
            </a>
            <p className="mt-3 text-xs">Thank you,<br/>Amazon Security Team</p>
          </div>
        </div>
      </div>

      {selectedFlag && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex gap-2">
            <Info className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-sm text-red-900">Why is this suspicious?</div>
              <div className="text-sm text-red-800 mt-1">
                {redFlags.find(f => f.id === selectedFlag)?.reason}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 text-center">
        Click on highlighted text to learn more
      </div>
    </div>
  );
}
