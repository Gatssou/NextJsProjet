"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TransitionPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/connectedPage");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden p-4">
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse blur-3xl"></div>
      </div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-75"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-150"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        
        {/* Image Container with Glow Effect */}
        <div className="relative mb-8 group">
          {/* Outer glow ring */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full opacity-50 blur-2xl group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
          
          {/* Middle glow ring */}
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-30 blur-xl animate-spin-slow"></div>
          
          {/* Image frame */}
          <div className="relative w-64 h-64 bg-slate-900/60 backdrop-blur-xl border-2 border-slate-700/50 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
            
            <img
              src="/placeholder-connexion.png"
              alt="Connexion réussie"
              className="w-full h-full object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Success checkmark overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 backdrop-blur-sm">
              <div className="w-20 h-20 bg-emerald-500/30 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-emerald-400 animate-bounce-subtle">
                <svg className="w-12 h-12 text-emerald-300" fill="none" strokeWidth="3" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Success Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 mb-6 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/50 rounded-full">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Authentification réussie</span>
        </div>

        {/* Success Title */}
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-center bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent animate-gradient">
          Connexion réussie !
        </h2>

        {/* Description */}
        <p className="text-lg text-slate-300 mb-8 text-center">
          Préparation de votre espace personnel...
        </p>

        {/* Animated Loader */}
        <div className="relative w-20 h-20 mb-6">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full animate-spin"></div>
          
          {/* Middle spinning ring */}
          <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin-reverse"></div>
          
          {/* Inner spinning ring */}
          <div className="absolute inset-4 border-4 border-transparent border-t-pink-500 border-r-cyan-500 rounded-full animate-spin"></div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs">
          <div className="relative h-2 bg-slate-800/50 backdrop-blur-sm rounded-full overflow-hidden border border-slate-700/50">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-progress"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">Chargement en cours...</p>
        </div>

      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
    </div>
  );
}