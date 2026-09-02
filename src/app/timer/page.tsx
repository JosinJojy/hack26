"use client";

import { useEffect, useMemo, useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Cormorant_Garamond, JetBrains_Mono, Orbitron } from "next/font/google";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });
const tech = Orbitron({ subsets: ["latin"], weight: ["500", "700", "900"] });

const PRESETS = [
  { label: "36h", seconds: 36 * 3600 },
  { label: "24h", seconds: 24 * 3600 },
  { label: "12h", seconds: 12 * 3600 },
  { label: "6h", seconds: 6 * 3600 },
  { label: "1h", seconds: 1 * 3600 },
  { label: "5m", seconds: 5 * 60 },
];

const DEFAULT_SECONDS = 36 * 3600; // 36 Hours standard
const AD_INTERVAL_SECONDS = 15; // 15 seconds interval between ads

const DEFAULT_ADS = [
  { id: 1, title: "Sponsor Spotlight 1", src: "/ad1.mp4" },
  { id: 2, title: "Sponsor Spotlight 2", src: "/ad2.mp4" },
];

function formatDuration(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  return {
    h: h.toString().padStart(2, "0"),
    m: m.toString().padStart(2, "0"),
    s: s.toString().padStart(2, "0"),
  };
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function ResetIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

function MaximizeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

function MinimizeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6 7 7M4 10h6m0 0V4m0 6L3 3m17 7h-6m0 0V4m0 6 7-7" />
    </svg>
  );
}

function VideoUploadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" />
      <path d="M9 12h4m-2-2v4" />
    </svg>
  );
}

function VolumeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function VolumeMuteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" x2="17" y1="9" y2="15" />
      <line x1="17" x2="23" y1="9" y2="15" />
    </svg>
  );
}

function SkipForwardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" x2="19" y1="5" y2="19" />
    </svg>
  );
}

export default function FramedVideoTimerPage() {
  // Main countdown timer state (ticks uninterrupted across all modes)
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_SECONDS);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  // Hourglass video state
  const [videoSrc, setVideoSrc] = useState<string>("/hourglass.mp4");
  const [videoError, setVideoError] = useState<boolean>(false);
  const [customVideoUploaded, setCustomVideoUploaded] = useState<boolean>(false);
  const [syncVideoWithTimer, setSyncVideoWithTimer] = useState<boolean>(true);
  const [videoFitMode, setVideoFitMode] = useState<"contain" | "cover">("contain");

  // Broadcast & Ad Rotation System
  const [adsEnabled, setAdsEnabled] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"timer" | "ad">("timer");
  const [adList] = useState(DEFAULT_ADS);
  const [currentAdIndex, setCurrentAdIndex] = useState<number>(0);
  const [timeUntilNextAd, setTimeUntilNextAd] = useState<number>(AD_INTERVAL_SECONDS);
  const [adMuted, setAdMuted] = useState<boolean>(true);
  const [adError, setAdError] = useState<boolean>(false);

  // UI view state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControlsInFullscreen, setShowControlsInFullscreen] = useState<boolean>(true);

  // References
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const adRotationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const adVideoRef = useRef<HTMLVideoElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Uninterrupted 36-Hour Countdown Engine
  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // 2. Broadcast Ad Rotation Timer: count down 15s of normal timer ONLY when isRunning is TRUE
  useEffect(() => {
    if (!adsEnabled || !isRunning) {
      if (adRotationIntervalRef.current) clearInterval(adRotationIntervalRef.current);
      return;
    }

    // Only count down to the next ad when in "timer" view mode and isRunning is true
    if (viewMode === "timer") {
      adRotationIntervalRef.current = setInterval(() => {
        setTimeUntilNextAd((prev) => {
          if (prev <= 1) {
            // Trigger Ad Mode!
            triggerAd();
            return AD_INTERVAL_SECONDS;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (adRotationIntervalRef.current) clearInterval(adRotationIntervalRef.current);
    }

    return () => {
      if (adRotationIntervalRef.current) clearInterval(adRotationIntervalRef.current);
    };
  }, [adsEnabled, viewMode, currentAdIndex, isRunning]);

  // Action: Trigger Ad playback
  const triggerAd = (adIndex?: number) => {
    if (typeof adIndex === "number") {
      setCurrentAdIndex(adIndex % adList.length);
    }
    setViewMode("ad");
    setAdError(false);
  };

  // Action: When Ad finishes or is skipped, return back to timer
  const returnToTimer = () => {
    setViewMode("timer");
    setTimeUntilNextAd(AD_INTERVAL_SECONDS);
    // Advance to next ad for next cycle
    setCurrentAdIndex((prev) => (prev + 1) % adList.length);
    // Ensure hourglass video plays again if timer is running
    if (videoRef.current && isRunning) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Sync ad video playback with viewMode and isRunning
  useEffect(() => {
    if (viewMode !== "ad" || !adVideoRef.current) return;
    if (isRunning) {
      adVideoRef.current.play().catch(() => {});
    } else {
      adVideoRef.current.pause();
    }
  }, [viewMode, currentAdIndex, isRunning]);

  // Sync hourglass video play/pause with timer if enabled
  useEffect(() => {
    if (!videoRef.current || viewMode === "ad") return;
    if (syncVideoWithTimer) {
      if (isRunning) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [isRunning, syncVideoWithTimer, viewMode]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      setShowControlsInFullscreen(true);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Fade out fullscreen controls on idle
  const handleMouseMove = () => {
    setShowControlsInFullscreen(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isFullscreen) {
        setShowControlsInFullscreen(false);
      }
    }, 4000);
  };

  const fractionRemaining = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  const progressPercent = Math.min(100, Math.max(0, (1 - fractionRemaining) * 100));
  const isFinished = secondsLeft === 0;
  const { h, m, s } = useMemo(() => formatDuration(secondsLeft), [secondsLeft]);

  const handleStart = () => {
    if (secondsLeft === 0) setSecondsLeft(totalSeconds);
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (adRotationIntervalRef.current) clearInterval(adRotationIntervalRef.current);
    setIsRunning(false);
    setTotalSeconds(DEFAULT_SECONDS); // 36 Hours standard (36 * 3600)
    setSecondsLeft(DEFAULT_SECONDS);   // Set to 36 hours
    setTimeUntilNextAd(AD_INTERVAL_SECONDS); // Set ad timer to 15 seconds
    setViewMode("timer"); // Return to main timer screen
    setCurrentAdIndex(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
    if (adVideoRef.current) {
      adVideoRef.current.pause();
      adVideoRef.current.currentTime = 0;
    }
  };

  const handlePreset = (seconds: number) => {
    setIsRunning(false);
    setTotalSeconds(seconds);
    setSecondsLeft(seconds);
    setTimeUntilNextAd(AD_INTERVAL_SECONDS);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleAdjustTime = (delta: number) => {
    setSecondsLeft((prev) => {
      const next = Math.max(0, prev + delta);
      if (next > totalSeconds) setTotalSeconds(next);
      return next;
    });
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (stageRef.current) {
          await stageRef.current.requestFullscreen();
        } else {
          await document.documentElement.requestFullscreen();
        }
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignored if permissions are restricted
    }
  };

  const handleCustomVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoError(false);
      setCustomVideoUploaded(true);
      if (videoRef.current) {
        videoRef.current.load();
        if (isRunning || !syncVideoWithTimer) {
          videoRef.current.play().catch(() => {});
        }
      }
    }
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-x-hidden bg-[#020617] px-3 py-3 sm:px-6 sm:py-6 select-none text-slate-100"
    >
      {/* Immersive layered atmosphere (Deep Navy / Royal Blue Palette) */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_#0f2b5c_0%,_#0a1936_40%,_#020617_90%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(14,165,233,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.025)_1px,transparent_1px)] bg-[size:55px_55px]" />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-[#1D4ED8]/18 blur-[150px]" />
      <div className="pointer-events-none fixed -bottom-40 left-1/2 h-[450px] w-[850px] -translate-x-1/2 rounded-full bg-[#2563EB]/12 blur-[140px]" />
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-amber-500/8 blur-[130px]" />

      {/* Top Header branding (Outside Stage) */}
      <header className="relative z-10 flex w-full max-w-6xl items-center justify-between px-2 pt-1 pb-3 sm:pb-5">
        {/* Left: Official Logos */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative h-7 sm:h-9 w-24 sm:w-32 cursor-pointer transition-transform hover:scale-105">
            <Image
              src="/logos/hack-logo.png"
              alt=".hack26"
              fill
              className="object-contain object-left drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
              priority
            />
          </div>

          <div className="h-5 w-[1px] bg-slate-700/60 hidden min-[450px]:block" />

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="relative h-5 sm:h-7 w-20 sm:w-28 cursor-pointer transition-opacity hover:opacity-100 opacity-85">
              <Image
                src="/logos/IEEE-mace.png"
                alt="IEEE MACE SB"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <div className="relative h-5 sm:h-7 w-14 sm:w-20 cursor-pointer transition-opacity hover:opacity-100 opacity-85">
              <Image
                src="/logos/IEEE.png"
                alt="IEEE"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right: Broadcast & Presentation Tools */}
        <div className="flex items-center gap-2">
          {/* Ad Status / Next Ad Badge */}
          {adsEnabled && (
            <div className={`hidden min-[680px]:flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors ${
              isRunning ? "border-amber-400/30 bg-amber-400/10 text-amber-200" : "border-slate-700/60 bg-slate-900/50 text-slate-400"
            }`}>
              <span className="relative flex h-2 w-2">
                {isRunning && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                )}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${isRunning ? "bg-amber-400" : "bg-slate-500"}`} />
              </span>
              <span className="font-mono text-[11px]">
                {viewMode === "ad"
                  ? isRunning
                    ? `Playing Ad ${currentAdIndex + 1}/2`
                    : `Ad ${currentAdIndex + 1}/2 Paused`
                  : !isRunning
                  ? `Paused (Ad in ${timeUntilNextAd}s)`
                  : `Next Ad in ${timeUntilNextAd}s`}
              </span>
            </div>
          )}

          {/* Trigger Ad Now (Manual Test / Stage Demo) */}
          <button
            onClick={() => (viewMode === "ad" ? returnToTimer() : triggerAd())}
            title="Immediately toggle between Ad video and Timer view"
            className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-900/50 px-2.5 sm:px-3 py-1.5 text-xs text-slate-300 backdrop-blur-md transition-all hover:border-amber-400/50 hover:text-amber-200"
          >
            <span className="font-mono text-amber-400 font-bold">ADS:</span>
            <span>{viewMode === "ad" ? "Return to Timer" : "Trigger Ad"}</span>
          </button>

          {/* Fit mode selector */}
          <button
            onClick={() => setVideoFitMode((prev) => (prev === "contain" ? "cover" : "contain"))}
            title={videoFitMode === "contain" ? "Showing Original Dimensions (Contain)" : "Showing Fill (Cover)"}
            className="hidden lg:flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-md transition-all hover:border-[#38bdf8]/50 hover:text-white"
          >
            <span className="font-mono text-[10px] text-amber-400 uppercase">Fit:</span>
            <span>{videoFitMode === "contain" ? "Original" : "Cover"}</span>
          </button>

          {/* Quick upload / preview button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomVideoUpload}
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Upload or preview an hourglass video file"
            className="hidden sm:flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-md transition-all hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-200"
          >
            <VideoUploadIcon className="h-3.5 w-3.5 text-amber-400" />
            <span>{customVideoUploaded ? "Custom Video" : "Preview Video"}</span>
          </button>

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen Zoomed View"
            title="Toggle Fullscreen Zoomed View"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-900/50 text-slate-300 backdrop-blur-md transition-all hover:border-white/40 hover:bg-slate-800 hover:text-white"
          >
            {isFullscreen ? <MinimizeIcon className="h-4 w-4" /> : <MaximizeIcon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Main Showcase Stage: Precision Framed Bezel */}
      <div className="relative z-10 flex w-full max-w-5xl flex-1 flex-col items-center justify-center py-1 sm:py-3">
        <div
          ref={stageRef}
          className={`relative w-full rounded-2xl sm:rounded-3xl p-[2px] transition-all duration-300 ${
            isFullscreen
              ? "!fixed !inset-0 !h-screen !w-screen !max-w-none !rounded-none !p-0 z-50 bg-[#020617]"
              : "shadow-[0_0_80px_rgba(2,6,23,0.9),0_0_40px_rgba(37,99,235,0.18)]"
          }`}
          style={{
            background: isFullscreen
              ? "#020617"
              : "linear-gradient(135deg, rgba(245,212,143,0.45) 0%, rgba(37,99,235,0.35) 45%, rgba(15,23,42,0.65) 65%, rgba(245,212,143,0.3) 100%)",
          }}
        >
          {/* Inner bezel frame with corner crosshair accents */}
          <div
            className={`relative flex flex-col justify-between overflow-hidden bg-[#020617] w-full ${
              isFullscreen
                ? "h-full w-full rounded-none border-none"
                : "rounded-[14px] sm:rounded-[22px] border border-slate-700/40 min-h-[380px] sm:min-h-[480px] md:min-h-[520px] aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9]"
            }`}
          >
            {/* Tech Bezel Corner Accents */}
            <div className="pointer-events-none absolute left-3 top-3 z-30 flex items-center gap-1">
              <span className="h-2 w-2 border-t-2 border-l-2 border-amber-400/80" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-amber-300/50">SYS.01</span>
            </div>
            <div className="pointer-events-none absolute right-3 top-3 z-30 flex items-center gap-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-amber-300/50">36H.LOCKED</span>
              <span className="h-2 w-2 border-t-2 border-r-2 border-amber-400/80" />
            </div>
            <div className="pointer-events-none absolute left-3 bottom-3 z-30">
              <span className="block h-2 w-2 border-b-2 border-l-2 border-amber-400/80" />
            </div>
            <div className="pointer-events-none absolute right-3 bottom-3 z-30">
              <span className="block h-2 w-2 border-b-2 border-r-2 border-amber-400/80" />
            </div>

            {/* =============================================================== */}
            {/* VIEW MODE A: NORMAL HOURGLASS TIMER PAGE                       */}
            {/* =============================================================== */}
            {viewMode === "timer" && (
              <>
                {/* 1. Hourglass Video Layer */}
                <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-[#020617] transition-opacity duration-700">
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    loop
                    muted
                    playsInline
                    autoPlay
                    onError={() => setVideoError(true)}
                    onLoadedData={() => setVideoError(false)}
                    className={`max-h-full max-w-full transition-all duration-700 ${
                      videoFitMode === "contain"
                        ? "object-contain w-auto h-full m-auto"
                        : "object-cover w-full h-full object-center"
                    }`}
                  />

                  {/* Graceful Fallback if video is loading/missing */}
                  {videoError && !customVideoUploaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_#0f2b5c_0%,_#0a1936_50%,_#020617_100%)]">
                      <div className="relative h-48 w-48 rounded-full border border-amber-400/20 bg-amber-500/5 shadow-[0_0_60px_rgba(217,160,56,0.15)] flex items-center justify-center animate-pulse">
                        <div className="h-32 w-32 rounded-full border border-dashed border-amber-300/30 animate-[spin_30s_linear_infinite]" />
                      </div>
                      <p className="mt-4 text-xs font-mono text-amber-300/60 tracking-wider">
                        [ AWAITING VIDEO AT /public/hourglass.mp4 ]
                      </p>
                    </div>
                  )}

                  {/* Ambient Blend Vignette & Edge Masks */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(2,6,23,0.15)_0%,_rgba(2,6,23,0.55)_65%,_rgba(2,6,23,0.95)_100%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-transparent to-[#020617]/85" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020617]/85 via-transparent to-[#020617]/85" />
                  <div className="pointer-events-none absolute -top-1/2 -left-1/2 h-[200%] w-[200%] rotate-12 bg-gradient-to-b from-white/[0.02] to-transparent" />
                </div>

                {/* 2. Frame Top Bar (Logos, Status, Progress) */}
                <div className="relative z-20 flex items-center justify-between px-4 pt-4 sm:px-8 sm:pt-6">
                  {/* Left Side: .hack26 Logo & Status */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative h-6 sm:h-8 w-20 sm:w-28 cursor-pointer transition-transform hover:scale-105">
                      <Image
                        src="/logos/hack-logo.png"
                        alt=".hack26 Logo"
                        fill
                        className="object-contain object-left drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
                        priority
                      />
                    </div>

                    <div className="hidden min-[520px]:flex items-center gap-2 rounded-full border border-slate-700/50 bg-[#020617]/70 px-2.5 py-1 backdrop-blur-md">
                      <span className="relative flex h-2 w-2">
                        {isRunning && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        )}
                        <span
                          className={`relative inline-flex h-2 w-2 rounded-full ${
                            isFinished
                              ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                              : isRunning
                              ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                              : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                          }`}
                        />
                      </span>
                      <span className={`${tech.className} text-[10px] font-semibold tracking-[0.2em] text-slate-300`}>
                        {isFinished ? "TIMEOVER" : isRunning ? "COUNTDOWN ACTIVE" : "PAUSED"}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: IEEE Logos, Elapsed Badge & Zoom Controls */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="relative h-5 sm:h-7 w-16 sm:w-24 opacity-85 hover:opacity-100 transition-opacity">
                        <Image
                          src="/logos/IEEE-mace.png"
                          alt="IEEE MACE SB"
                          fill
                          className="object-contain object-right"
                          priority
                        />
                      </div>
                      <div className="relative h-5 sm:h-7 w-12 sm:w-16 opacity-85 hover:opacity-100 transition-opacity">
                        <Image
                          src="/logos/IEEE.png"
                          alt="IEEE"
                          fill
                          className="object-contain object-right"
                          priority
                        />
                      </div>
                    </div>

                    {/* Elapsed status badge */}
                    <div className="rounded-full border border-amber-400/30 bg-[#020617]/75 px-2.5 sm:px-3 py-1 backdrop-blur-md shadow-[0_0_15px_rgba(2,6,23,0.5)]">
                      <span className="text-[10px] sm:text-xs font-mono tracking-widest text-amber-300/90 font-medium">
                        {progressPercent.toFixed(1)}% ELAPSED
                      </span>
                    </div>

                    {/* Exit zoom button when in fullscreen */}
                    {isFullscreen && (
                      <button
                        onClick={toggleFullscreen}
                        title="Exit Fullscreen"
                        className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-slate-700/60 bg-[#020617]/80 text-slate-200 hover:bg-slate-800 transition-all"
                      >
                        <MinimizeIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Center Digital Clock Pod */}
                <div className="relative z-20 my-auto flex flex-col items-center justify-center px-4 py-4 sm:py-6">
                  <div className="relative flex flex-col items-center rounded-2xl sm:rounded-3xl border border-slate-700/40 bg-[#020617]/55 px-5 py-4 sm:px-10 sm:py-7 shadow-[0_20px_50px_rgba(2,6,23,0.8)] backdrop-blur-[6px]">
                    <p className={`${display.className} text-xs sm:text-sm md:text-base uppercase tracking-[0.45em] text-amber-200/85 [text-shadow:0_0_15px_rgba(245,212,143,0.4)]`}>
                      {isFinished ? "HACKATHON CONCLUDED" : "TIME REMAINING"}
                    </p>

                    <div
                      className={`${mono.className} mt-2 sm:mt-3 flex items-center justify-center font-bold tabular-nums text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight [text-shadow:0_0_25px_rgba(255,255,255,0.45),0_0_55px_rgba(217,165,60,0.35)]`}
                    >
                      {/* Hours */}
                      <div className="flex flex-col items-center">
                        <span className="inline-block transition-transform duration-200 hover:scale-105">
                          {h}
                        </span>
                        <span className="mt-1 font-mono text-[9px] sm:text-[11px] md:text-xs font-normal tracking-[0.25em] text-amber-200/60 uppercase">
                          HOURS
                        </span>
                      </div>

                      <span className="mx-1 sm:mx-3 -translate-y-2 sm:-translate-y-3 font-mono font-light text-amber-400/60 animate-pulse">
                        :
                      </span>

                      {/* Minutes */}
                      <div className="flex flex-col items-center">
                        <span className="inline-block transition-transform duration-200 hover:scale-105">
                          {m}
                        </span>
                        <span className="mt-1 font-mono text-[9px] sm:text-[11px] md:text-xs font-normal tracking-[0.25em] text-amber-200/60 uppercase">
                          MINS
                        </span>
                      </div>

                      <span className="mx-1 sm:mx-3 -translate-y-2 sm:-translate-y-3 font-mono font-light text-amber-400/60 animate-pulse">
                        :
                      </span>

                      {/* Seconds */}
                      <div className="flex flex-col items-center">
                        <span className="inline-block text-amber-300 transition-transform duration-200 hover:scale-105">
                          {s}
                        </span>
                        <span className="mt-1 font-mono text-[9px] sm:text-[11px] md:text-xs font-normal tracking-[0.25em] text-amber-300/80 uppercase">
                          SECS
                        </span>
                      </div>
                    </div>

                    {/* Quick Minute Adjusters */}
                    <div className="mt-3 sm:mt-4 flex items-center gap-2">
                      <button
                        onClick={() => handleAdjustTime(-300)}
                        disabled={secondsLeft <= 0}
                        className="rounded border border-slate-700/50 bg-slate-900/40 px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800/80 hover:text-white disabled:opacity-30"
                      >
                        -5m
                      </button>
                      <button
                        onClick={() => handleAdjustTime(300)}
                        className="rounded border border-slate-700/50 bg-slate-900/40 px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800/80 hover:text-white"
                      >
                        +5m
                      </button>
                      <button
                        onClick={() => handleAdjustTime(3600)}
                        className="rounded border border-slate-700/50 bg-slate-900/40 px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800/80 hover:text-white"
                      >
                        +1h
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Bottom Progress Bar */}
                <div className="relative z-20 w-full px-4 pb-4 sm:px-8 sm:pb-6">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-400 mb-1.5">
                    <span>START [00:00:00]</span>
                    <span className="text-amber-300/80">36-HOUR GOAL</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-slate-800/80 p-[1px]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-emerald-400 shadow-[0_0_12px_rgba(251,191,36,0.6)] transition-all duration-1000 ease-linear"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </>
            )}

            {/* =============================================================== */}
            {/* VIEW MODE B: CRICKET/SPORTS BROADCAST AD SCREEN OVERLAY         */}
            {/* =============================================================== */}
            {viewMode === "ad" && (
              <div className="relative z-20 flex h-full w-full flex-col justify-between overflow-hidden bg-black animate-[fadeIn_0.5s_ease-out]">
                {/* Full/Contained Ad Video Player */}
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
                  <video
                    ref={adVideoRef}
                    key={adList[currentAdIndex].src}
                    src={adList[currentAdIndex].src}
                    autoPlay
                    playsInline
                    muted={adMuted}
                    onEnded={returnToTimer}
                    onError={() => {
                      setAdError(true);
                      // If ad video file fails, wait 6s then return to timer
                      setTimeout(returnToTimer, 6000);
                    }}
                    className="max-h-full max-w-full w-full h-full object-contain m-auto"
                  />

                  {adError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617] text-center p-6">
                      <p className="text-amber-300 font-mono text-sm tracking-wider">
                        [ SPONSOR AD LOADING / NOT FOUND AT {adList[currentAdIndex].src} ]
                      </p>
                      <p className="text-slate-400 text-xs font-mono mt-2">
                        Returning to timer in 6 seconds...
                      </p>
                    </div>
                  )}
                </div>

                {/* Top Header Layer inside Ad Screen */}
                <div className="relative z-30 flex items-start justify-between p-4 sm:p-6 pointer-events-none">
                  {/* Left: Sponsor Indicator Badge */}
                  <div className="pointer-events-auto flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-amber-400/40 bg-[#020617]/85 px-3 py-1.5 backdrop-blur-md shadow-xl">
                      <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className={`${tech.className} text-[11px] font-bold tracking-widest text-amber-200 uppercase`}>
                        SPONSOR SPOTLIGHT [{currentAdIndex + 1}/{adList.length}]
                      </span>
                    </div>

                    {/* Sound toggle for ad */}
                    <button
                      onClick={() => setAdMuted(!adMuted)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-[#020617]/80 text-white backdrop-blur-md transition-all hover:bg-white/20"
                      title={adMuted ? "Unmute Ad Sound" : "Mute Ad Sound"}
                    >
                      {adMuted ? <VolumeMuteIcon className="h-4 w-4" /> : <VolumeIcon className="h-4 w-4 text-emerald-400" />}
                    </button>
                  </div>

                  {/* CRICKET SCREEN SCOREBUG HUD: LIVE TIMER ON THE RIGHT CORNER */}
                  <div className="pointer-events-auto flex flex-col items-end">
                    <div className="flex flex-col items-end rounded-xl border-2 border-amber-400/60 bg-[#020617]/90 px-4 py-2.5 backdrop-blur-md shadow-[0_0_30px_rgba(2,6,23,0.9),0_0_15px_rgba(217,165,60,0.3)]">
                      {/* Live Badge */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-80" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                        </span>
                        <span className={`${tech.className} text-[10px] font-bold tracking-widest text-white`}>
                          .HACK26 LIVE
                        </span>
                      </div>

                      {/* Prominent, high-contrast corner countdown digits */}
                      <div className={`${mono.className} text-xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums [text-shadow:0_0_15px_rgba(245,212,143,0.5)]`}>
                        <span className="text-amber-100">{h}</span>
                        <span className="text-amber-400/80 mx-1">:</span>
                        <span className="text-amber-100">{m}</span>
                        <span className="text-amber-400/80 mx-1">:</span>
                        <span className="text-amber-300">{s}</span>
                      </div>

                      <div className="flex items-center justify-between w-full mt-1.5 pt-1 border-t border-white/10">
                        <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">
                          {isRunning ? "36H RUNNING" : "36H PAUSED"}
                        </p>
                        <button
                          onClick={isRunning ? handlePause : handleStart}
                          aria-label={isRunning ? "Pause countdown and ad" : "Resume countdown and ad"}
                          title={isRunning ? "Pause all (timer & ad)" : "Resume all (timer & ad)"}
                          className={`ml-2 flex h-6 px-2 items-center gap-1 rounded-full border text-[10px] font-mono transition-all ${
                            isRunning
                              ? "border-amber-400/50 bg-amber-400/15 text-amber-200 hover:bg-amber-400 hover:text-black"
                              : "border-emerald-400/60 bg-emerald-400/20 text-emerald-300 hover:bg-emerald-400 hover:text-black"
                          }`}
                        >
                          {isRunning ? (
                            <>
                              <PauseIcon className="h-2.5 w-2.5" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <PlayIcon className="h-2.5 w-2.5" />
                              <span>Play</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Ad Controls & Return to Timer Button */}
                <div className="relative z-30 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
                  <div className="pointer-events-auto flex items-center gap-3">
                    <span className="text-[10px] font-mono tracking-widest text-white/50 bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm">
                      {isRunning ? "AUTO-RESUMES AFTER AD" : "AD & TIMER PAUSED"}
                    </span>
                    <button
                      onClick={isRunning ? handlePause : handleStart}
                      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-mono backdrop-blur-md transition-all ${
                        isRunning
                          ? "border-amber-400/60 bg-[#020617]/90 text-amber-200 hover:bg-amber-400 hover:text-black"
                          : "border-emerald-400/70 bg-[#020617]/90 text-emerald-300 hover:bg-emerald-400 hover:text-black"
                      }`}
                    >
                      {isRunning ? <PauseIcon className="h-3.5 w-3.5" /> : <PlayIcon className="h-3.5 w-3.5" />}
                      <span>{isRunning ? "Pause" : "Resume"}</span>
                    </button>

                    <button
                      onClick={handleReset}
                      title="Restart timer to 36 hours and ad timer to 15 seconds"
                      className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-[#020617]/90 px-3 py-1.5 text-xs font-mono text-slate-300 hover:border-amber-400/60 hover:text-white transition-all"
                    >
                      <ResetIcon className="h-3.5 w-3.5" />
                      <span>Restart</span>
                    </button>
                  </div>

                  <div className="pointer-events-auto">
                    <button
                      onClick={returnToTimer}
                      className="flex items-center gap-2 rounded-lg border border-amber-400/50 bg-[#020617]/90 px-4 py-2 text-xs font-mono font-semibold text-amber-200 backdrop-blur-md shadow-2xl transition-all hover:scale-105 hover:bg-amber-400 hover:text-black"
                    >
                      <span>Return to Timer</span>
                      <SkipForwardIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* FULLSCREEN / ZOOMED FLOATING CONTROLS OVERLAY                   */}
            {/* =============================================================== */}
            {isFullscreen && (
              <div
                className={`relative z-30 pb-2 flex flex-col items-center gap-3 transition-opacity duration-300 ${
                  showControlsInFullscreen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-4 rounded-full border border-slate-700/60 bg-[#020617]/85 px-5 py-2 backdrop-blur-md shadow-2xl">
                  {/* Start / Pause in Fullscreen */}
                  <button
                    onClick={isRunning ? handlePause : handleStart}
                    aria-label={isRunning ? "Pause timer" : "Start timer"}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                      isRunning
                        ? "border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_15px_rgba(217,165,60,0.5)]"
                        : "border-emerald-400 bg-emerald-400/20 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                    }`}
                  >
                    {isRunning ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5 translate-x-0.5" />}
                  </button>

                  {/* Reset in Fullscreen */}
                  <button
                    onClick={handleReset}
                    aria-label="Reset timer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
                  >
                    <ResetIcon className="h-4 w-4" />
                  </button>

                  {/* Presets in Fullscreen */}
                  <div className="flex items-center gap-1.5 pl-2 border-l border-slate-700/60">
                    {PRESETS.map((p) => (
                      <button
                        key={p.seconds}
                        onClick={() => handlePreset(p.seconds)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-mono uppercase transition-all ${
                          totalSeconds === p.seconds
                            ? "border border-amber-400/80 bg-amber-400/20 text-amber-200"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Manual Ad Switch in Fullscreen */}
                  <button
                    onClick={() => (viewMode === "ad" ? returnToTimer() : triggerAd())}
                    className="text-[11px] font-mono border-l border-slate-700/60 pl-2 text-amber-300 hover:underline"
                  >
                    {viewMode === "ad" ? "Exit Ad" : "Play Ad"}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 7. EXTERNAL CONTROL PANEL (Visible in Standard View) */}
        {!isFullscreen && (
          <div className="mt-5 sm:mt-7 flex w-full max-w-2xl flex-col items-center gap-4 sm:gap-5">
            {/* Preset Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {PRESETS.map((p) => {
                const active = totalSeconds === p.seconds;
                return (
                  <button
                    key={p.seconds}
                    onClick={() => handlePreset(p.seconds)}
                    className={`${display.className} rounded-full border px-3.5 py-1 text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 ${
                      active
                        ? "border-amber-400/80 bg-amber-400/20 text-amber-200 shadow-[0_0_15px_rgba(217,165,60,0.3)]"
                        : "border-slate-700/50 bg-[#020617]/50 text-slate-400 hover:border-slate-500 hover:text-slate-100"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Primary Action Controls: Play / Pause & Reset */}
            <div className="flex items-center justify-center gap-6 sm:gap-8">
              {/* Start / Pause Button with Glow Halo */}
              <button
                onClick={isRunning ? handlePause : handleStart}
                aria-label={isRunning ? "Pause countdown timer" : "Start countdown timer"}
                className={`group relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isRunning
                    ? "border-amber-400/80 bg-amber-400/15 text-amber-200 shadow-[0_0_35px_rgba(217,165,60,0.4)]"
                    : "border-emerald-400/80 bg-emerald-400/15 text-emerald-300 shadow-[0_0_35px_rgba(52,211,153,0.35)]"
                }`}
              >
                {/* Outer pulsing ring */}
                <span
                  className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                    isRunning
                      ? "border border-amber-300/40 animate-ping opacity-25"
                      : "border border-emerald-300/40 opacity-0 group-hover:opacity-60"
                  }`}
                />
                {isRunning ? (
                  <PauseIcon className="h-7 w-7 sm:h-8 sm:w-8 transition-transform group-hover:scale-110" />
                ) : (
                  <PlayIcon className="h-7 w-7 sm:h-8 sm:w-8 translate-x-0.5 transition-transform group-hover:scale-110" />
                )}
              </button>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                aria-label="Reset countdown timer"
                className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/50 text-slate-400 transition-all hover:scale-105 hover:border-slate-500 hover:bg-slate-800 hover:text-white active:scale-95"
              >
                <ResetIcon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform hover:rotate-180 duration-500" />
              </button>
            </div>

            {/* Broadcast Options Bar */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono text-slate-400 pt-1">
              {/* Ad Rotation Enable/Disable Toggle */}
              <button
                onClick={() => setAdsEnabled(!adsEnabled)}
                className="flex items-center gap-2 transition-colors hover:text-slate-200"
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded border transition-colors ${
                    adsEnabled
                      ? "border-amber-400 bg-amber-400/40 shadow-[0_0_8px_rgba(217,165,60,0.5)]"
                      : "border-slate-700 bg-transparent"
                  }`}
                />
                <span>Auto-rotate ads every 15s ({adsEnabled ? "Enabled" : "Paused"})</span>
              </button>

              {/* Sync Video with Timer option */}
              <button
                onClick={() => setSyncVideoWithTimer(!syncVideoWithTimer)}
                className="flex items-center gap-2 transition-colors hover:text-slate-200"
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded border transition-colors ${
                    syncVideoWithTimer
                      ? "border-amber-400 bg-amber-400/40 shadow-[0_0_8px_rgba(217,165,60,0.5)]"
                      : "border-slate-700 bg-transparent"
                  }`}
                />
                <span>Sync hourglass with timer start/pause</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info / Helper */}
      {!isFullscreen && (
        <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl px-2 pt-4 pb-2 text-[11px] font-mono text-slate-400 gap-2 border-t border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>Ads loaded from: <code className="text-amber-300">hack26/public/ad1.mp4</code> &amp; <code className="text-amber-300">ad2.mp4</code></span>
          </div>
          <div>
            <span>IEEE MACE SB // .hack26 OFFICIAL PLATFORM</span>
          </div>
        </footer>
      )}
    </main>
  );
}
