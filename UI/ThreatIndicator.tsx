import { Fish } from 'lucide-react';

export function PhishTellLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Fish icon with shield dot */}
      <div className="relative">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
          <Fish className="w-6 h-6 text-[#F97316] fill-[#F97316]" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
          <div className="w-2 h-2 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-full"></div>
        </div>
      </div>
      
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Phish & Tell
        </h1>
        <p className="text-[13px] text-white/90 -mt-0.5 font-medium">We scanned this link for you</p>
        <p className="text-[11px] text-white/70 -mt-0.5">Powered by real-time AI risk detection</p>
      </div>
    </div>
  );
}