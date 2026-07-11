export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#010005] flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle deep space glow matching the Hero section */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-[#2563EB]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        
        {/* Animated futuristic dual-spinning rings */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div 
            className="absolute w-full h-full border-[2px] border-transparent border-t-[#3770FF] border-r-[#3770FF]/30 rounded-full animate-spin" 
            style={{ animationDuration: '1.5s' }}
          />
          <div 
            className="absolute w-14 h-14 border-[2px] border-transparent border-b-[#2563EB] border-l-[#2563EB]/50 rounded-full animate-spin" 
            style={{ animationDuration: '2s', animationDirection: 'reverse' }}
          />
          <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
        </div>

        <div className="flex items-center gap-6 opacity-80">
          <div className="w-10 md:w-16 h-[1px] bg-[#3770FF]/40" />
          <p className="text-[#3770FF] font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase animate-pulse">
            System Boot
          </p>
          <div className="w-10 md:w-16 h-[1px] bg-[#3770FF]/40" />
        </div>

      </div>
    </div>
  );
}
