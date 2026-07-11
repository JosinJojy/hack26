export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#010005] flex flex-col items-center justify-center overflow-hidden">
      <style>{`
        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes pulse-core {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Subtle deep space glow matching the Hero section */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-[#3770FF]/10 blur-[130px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Premium Minimal SVG Tech Spinner */}
        <div className="relative w-16 h-16 mb-10 flex items-center justify-center">
          {/* Outer Track */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="46"
              fill="none"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
          </svg>
          
          {/* Fast Inner Ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ animation: 'spin-slow 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}>
            <circle
              cx="50" cy="50" r="38"
              fill="none"
              stroke="#3770FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="60 200"
              className="opacity-80"
            />
          </svg>

          {/* Slow Outer Ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ animation: 'spin-slow 3s linear infinite reverse' }}>
            <circle
              cx="50" cy="50" r="46"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="30 250"
            />
          </svg>

          {/* Core Dot */}
          <div 
            className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full shadow-[0_0_12px_#38BDF8]"
            style={{ animation: 'pulse-core 2s ease-in-out infinite' }}
          />
        </div>

        {/* Minimal High-Tech Typography & Scan Line */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-5 opacity-90">
            <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#3770FF]/50" />
            <p className="text-[#38BDF8] font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase font-light">
              Igniting Innovation
            </p>
            <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#3770FF]/50" />
          </div>
          
          <div className="w-56 md:w-64 h-[1px] bg-slate-800/40 relative overflow-hidden rounded-full">
            <div 
              className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent opacity-80"
              style={{ animation: 'scan-line 2s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
