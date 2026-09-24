"use client";
import React, { useState, useEffect } from "react";
import { Play, Volume2, VolumeX, ArrowRight, Instagram } from "lucide-react";

interface VideoReelSectionProps {
  videoUrl: string;
  title?: string;
  subtitle?: string;
  thumbnail?: string;
}

export const VideoReelSection: React.FC<VideoReelSectionProps> = ({
  videoUrl,
  title = "Experience SyncRetreat",
  subtitle = "See what a month of deep work and coastal living in Varkala looks like.",
  thumbnail,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isInstagram = videoUrl.includes("instagram.com");
  const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
  const isDirect = !isInstagram && !isYouTube;

  // Load Instagram embed script and process embeds cleanly
  useEffect(() => {
    if (isInstagram) {
      const processInstagram = () => {
        if ((window as any).instgrm?.Embeds) {
          (window as any).instgrm.Embeds.process();
        }
      };

      const existingScript = document.getElementById("instagram-embed-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "instagram-embed-script";
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => {
          setTimeout(processInstagram, 100);
        };
        document.body.appendChild(script);
      } else {
        processInstagram();
      }

      const timer1 = setTimeout(processInstagram, 300);
      const timer2 = setTimeout(processInstagram, 1000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isInstagram, videoUrl]);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1`;
  };

  return (
    <section className="relative border-t border-stone-200 bg-[#FEFBF7] text-zinc-900 h-[calc(100vh-5rem)] min-h-[560px] max-h-[820px] flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Container scaled to strictly fit in one screen view */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-auto video-reel-scaler">
        
        {/* Editorial Section Header matching PlacesToSee & PropertyAndWorkspace */}
        <div className="text-center mb-3 sm:mb-4 max-w-2xl px-4">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.4em] text-(--copper) mb-1.5">
            COHORT IN MOTION
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium tracking-tight text-zinc-900 leading-tight">
            {title}
          </h2>
          <p className="text-zinc-500 font-sans text-xs sm:text-sm md:text-base leading-relaxed mt-1.5 line-clamp-1">
            {subtitle}
          </p>
        </div>

        {/* Video Card Frame styled consistently with site artifacts & cards */}
        <div className="relative rounded-3xl border border-stone-200 bg-white p-2.5 sm:p-3 shadow-xl shadow-stone-200/60 transition-all duration-300 hover:shadow-stone-300/70 max-w-[330px] w-full flex flex-col items-center">
          
          {/* Card Top Label */}
          <div className="w-full flex items-center justify-between px-2 pt-1 pb-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Reel · Varkala
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
              @syncretreat
            </span>
          </div>

          {/* Embedded Player Box */}
          <div className="relative w-full max-w-[310px] max-h-[min(52vh,460px)] rounded-2xl overflow-hidden bg-stone-50 border border-stone-200/80 flex items-center justify-center">
            {isInstagram ? (
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={videoUrl}
                data-instgrm-version="14"
                style={{
                  background: "#FAFAF9",
                  border: 0,
                  borderRadius: "16px",
                  margin: "0 auto",
                  maxWidth: "310px",
                  minWidth: "260px",
                  padding: 0,
                  width: "100%",
                }}
              >
                <div style={{ padding: "8px 12px" }}>
                  <a
                    href={videoUrl}
                    style={{
                      background: "#FAFAF9",
                      lineHeight: 0,
                      padding: 0,
                      textAlign: "center",
                      textDecoration: "none",
                      width: "100%",
                      display: "block",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex flex-col items-center justify-center py-24 text-zinc-600">
                      <Play className="w-10 h-10 text-(--copper) mb-2 opacity-85" />
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                        Watch Reel on Instagram
                      </span>
                    </div>
                  </a>
                </div>
              </blockquote>
            ) : (
              /* YouTube or Direct Video in 9:16 portrait */
              <div className="relative w-full aspect-[9/16] max-h-[min(52vh,460px)] bg-stone-900 rounded-2xl overflow-hidden">
                {!isPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-900">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt="Video thumbnail"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-stone-900" />
                    )}
                    <div className="absolute inset-0 bg-black/40" />
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="relative z-10 group/play"
                      aria-label="Play video"
                    >
                      <div className="relative w-14 h-14 bg-white hover:bg-stone-100 rounded-full flex items-center justify-center transition-all transform hover:scale-105 shadow-xl border border-stone-200">
                        <Play className="w-6 h-6 text-(--copper) ml-1" fill="currentColor" />
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    {isYouTube ? (
                      <iframe
                        src={getYouTubeEmbedUrl(videoUrl)}
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={videoUrl}
                        className="absolute inset-0 w-full h-full object-cover"
                        controls
                        autoPlay
                        muted={isMuted}
                        playsInline
                        loop
                      />
                    )}
                    {isDirect && (
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="absolute bottom-3 right-3 z-20 w-8 h-8 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-white" />
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Link below embed */}
          <div className="w-full pt-2.5 pb-1 flex items-center justify-center">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--basalt) hover:bg-black text-white text-[11px] font-mono uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow"
            >
              <Instagram size={12} className="text-(--copper-light)" />
              <span>Watch on Instagram</span>
              <ArrowRight size={12} className="text-(--copper)" />
            </a>
          </div>

        </div>

      </div>

      <style jsx>{`
        /* Smooth scaling for compact laptop screens to maintain strictly 100vh single page view */
        @media (max-height: 750px) {
          .video-reel-scaler {
            transform: scale(0.88);
            transform-origin: center center;
          }
        }
        @media (max-height: 650px) {
          .video-reel-scaler {
            transform: scale(0.78);
            transform-origin: center center;
          }
        }
      `}</style>
    </section>
  );
};
