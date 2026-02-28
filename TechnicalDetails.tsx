import { Fish } from 'lucide-react';

export function PhishTellIcon() {
  return (
    <div className="relative">
      <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-2xl flex items-center justify-center shadow-lg">
        <Fish className="w-6 h-6 text-[#F97316] fill-[#F97316]" />
      </div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
        <div className="w-2 h-2 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-full"></div>
      </div>
    </div>
  );
}