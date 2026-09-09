"use client";
import React, { useState, useEffect } from "react";
import { Play, Volume2, VolumeX, Sparkles } from "lucide-react";

interface VideoReelSectionProps {
  videoUrl: string;
  title?: string;
  subtitle?: string;
  thumbnail?: string;
}

export const VideoReelSection: React.FC<VideoReelSectionProps> = ({
  videoUrl,
  title = "Experience SyncRetreat",
  subtitle = "See what a month of deep work and adventure looks like",
  thumbnail,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isInstagram = videoUrl.includes("instagram.com");
  const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
  const isDirect = !isInstagram && !isYouTube;

  // Load Instagram embed script
  useEffect(() => {
    if (isInstagram) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      const timer = setTimeout(() => {
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isInstagram]);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1`;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white py-20 md:py-28">
      {/* Animated Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:32px_32px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-2 h-2 bg-emerald-400 rounded-full" />
      </div>
      <div className="absolute top-40 right-20 animate-float delay-500">
        <div className="w-3 h-3 bg-emerald-300 rounded-full" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float delay-1000">
        <div className="w-2 h-2 bg-blue-400 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Title with Badge */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700 tracking-wide">
              FEATURED STORY
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Video Container */}
        <div className="flex justify-center">
          {isInstagram ? (
            // Instagram Native Embed - Clean & Simple
            <div className="relative group">
              {/* Subtle Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 rounded-[28px] opacity-20 blur-xl group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-gradient-x" />
              
              {/* Instagram Embed */}
              <div className="relative w-full max-w-[400px]">
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink={videoUrl}
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: 0,
                    borderRadius: "24px",
                    boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                    margin: "0 auto",
                    maxWidth: "400px",
                    minWidth: "326px",
                    padding: 0,
                    width: "100%",
                  }}
                >
                  <div style={{ padding: "16px" }}>
                    <a
                      href={videoUrl}
                      style={{
                        background: "#FFFFFF",
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
                      View this post on Instagram
                    </a>
                  </div>
                </blockquote>
              </div>
            </div>
          ) : (
            // YouTube or Direct Video with Glass Morphism
            <div className="relative group">
              {/* Animated Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 rounded-[28px] opacity-30 blur-xl group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-x" />
              
              {/* Video Container */}
              <div className="relative w-full max-w-[400px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50">
                <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
                  {!isPlaying ? (
                    // Thumbnail with Enhanced Play Button
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                      {thumbnail ? (
                        <img
                          src={thumbnail}
                          alt="Video thumbnail"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600" />
                      )}
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      
                      {/* Enhanced Play Button */}
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="relative z-10 group/play"
                        aria-label="Play video"
                      >
                        {/* Button Glow */}
                        <div className="absolute inset-0 rounded-full bg-emerald-500 blur-xl opacity-50 group-hover/play:opacity-75 transition-opacity" />
                        
                        {/* Button */}
                        <div className="relative w-20 h-20 bg-white/95 hover:bg-white rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl border-4 border-white/20">
                          <Play className="w-10 h-10 text-emerald-600 ml-1 group-hover/play:text-emerald-700" fill="currentColor" />
                        </div>
                      </button>
                    </div>
                  ) : (
                    // Video Player
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
                          className="absolute bottom-4 right-4 z-20 w-12 h-12 bg-slate-900/70 hover:bg-slate-900/90 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5 text-white" />
                          ) : (
                            <Volume2 className="w-5 h-5 text-white" />
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Caption/CTA Below Video */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
            <p className="text-sm text-slate-600 font-medium">
              Watch how our community lives, works, and explores together
            </p>
          </div>
        </div>

        {/* Decorative Bottom Elements */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
        </div>
      </div>

      {/* Custom Animations CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .bg-grid-slate-900\/\[0\.04\] {
          background-image: 
            linear-gradient(to right, rgb(15 23 42 / 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(15 23 42 / 0.04) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};
