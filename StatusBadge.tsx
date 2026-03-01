import { Fish } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Fish className="w-7 h-7 text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
        </div>
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="font-bold text-lg tracking-tight">Phish</span>
          <span className="font-bold text-lg tracking-tight text-cyan-200">&</span>
          <span className="font-bold text-lg tracking-tight">Tell</span>
        </div>
        <p className="text-[10px] opacity-90 -mt-0.5 tracking-wide">EMAIL PROTECTION</p>
      </div>
    </div>
  );
}
