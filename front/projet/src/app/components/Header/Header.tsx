"use client";
import { useState, useEffect } from "react";
import AuthForm from "../AuthForm";
import MobileOverlay from "../MobileOverlay/MobileOverlay";
import Sidebar from "../Sidebar/Sidebar";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    

    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar à gauche */}
   

      <div className="flex-1 flex flex-col">
        {/* Header en top */}
    <header className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 shadow-2xl overflow-hidden">
  {/* Animated Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse blur-3xl"></div>
  </div>

  {/* Main Header Container */}
  <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-6 lg:py-8">
    <div className="flex justify-between items-start lg:items-center gap-8">
      
      {/* Left Side - Brand & Description */}
      <div className="flex-1 space-y-4">
        <a href="#" className="group inline-block">
          <div className="flex items-center gap-4">
            {/* Logo avec effet néon */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <h1 className="relative text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent px-4 py-2">
                JForPlay
              </h1>
            </div>
            
            {/* Badge "Pro" */}
            <span className="hidden lg:inline-flex px-3 py-1 text-xs font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 rounded-full shadow-lg">
              Jeux en ligne
            </span>
          </div>
        </a>

        {/* Tagline & Description - Desktop Only */}
        {!isMobile && (
          <div className="space-y-2 max-w-xl">
            <p className="text-xl font-semibold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text">
              La plateforme gaming 
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Rejoignez des milliers de joueurs dans une expérience immersive unique. 
              Tournois exclusifs, récompenses instantanées, communauté active 24/7.
            </p>
            
            {/* Quick Stats */}
            <div className="flex gap-6 pt-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400">
                  <span className="text-emerald-400 font-bold">5K</span> Jeux
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400">
                  <span className="text-purple-400 font-bold">156</span> articles
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Auth Form */}
      {!isMobile && (
        <div className="w-96 relative">
          {/* Glow effect derrière le form */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30"></div>
          
          {/* Form container avec glassmorphism */}
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <AuthForm />
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          className="relative group p-3 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl shadow-lg active:scale-95 transition-transform"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
          <svg 
            className="w-6 h-6 text-cyan-400 relative z-10" 
            fill="none" 
            strokeWidth="2" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </div>

    {/* Mobile Tagline */}
    {isMobile && (
      <div className="mt-4 pt-4 border-t border-slate-800">
        <p className="text-sm font-semibold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text">
          Gaming nouvelle génération
        </p>
        <div className="flex gap-4 mt-2">
          <span className="text-xs text-slate-400">
            <span className="text-emerald-400 font-bold">24.5K</span> joueurs
          </span>
          <span className="text-xs text-slate-400">
            <span className="text-purple-400 font-bold">156</span> tournois
          </span>
        </div>
      </div>
    )}
  </div>

  {/* Bottom gradient line */}
  <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>

  {/* Mobile Overlay */}
  {isMobile && menuOpen && (
    <MobileOverlay onClose={() => setMenuOpen(false)} />
  )}
</header>
  {/* AuthForm Desktop */}
        

        {/* Main content */}
       <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
  {/* Animated Background Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse blur-3xl"></div>
  </div>

  {/* Decorative grid pattern */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

  <div className="relative mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-12 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
    
    {/* Left Side - Content */}
    <div className="space-y-8">
      {/* Title with gradient */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Spécifications Techniques</span>
        </div>
        
        <h2 className="text-4xl font-black tracking-tight sm:text-5xl bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          Technical Specifications
        </h2>
        
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"></div>
      </div>

      <p className="text-lg text-slate-300 leading-relaxed">
        The walnut wood card tray is precision milled to perfectly fit a stack of Focus cards. The powder coated steel divider separates active cards from new ones, or can be used to archive important task lists.
      </p>

      {/* Specifications Grid */}
      <dl className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {[
          { label: 'Origin', value: 'Designed by Good Goods, Inc.' },
          { label: 'Material', value: 'Solid walnut base with rare earth magnets and powder coated steel card cover' },
          { label: 'Dimensions', value: '6.25" x 3.55" x 1.15"' },
          { label: 'Finish', value: 'Hand sanded and finished with natural oil' },
          { label: 'Includes', value: 'Wood card tray and 3 refill packs' },
          { label: 'Considerations', value: 'Made from natural materials. Grain and color vary with each item.' }
        ].map((spec, index) => (
          <div 
            key={spec.label}
            className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:border-cyan-500/50 transition-all duration-300"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300"></div>
            
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <dt className="relative font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-sm uppercase tracking-wide mb-2">
              {spec.label}
            </dt>
            <dd className="relative text-sm text-slate-400 leading-relaxed">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>

    {/* Right Side - Image Grid */}
    <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
      {[
        { src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-01.jpg", alt: "Walnut card tray with white powder coated steel divider and 3 punchout holes." },
        { src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-02.jpg", alt: "Top down view of walnut card tray with embedded magnets and card groove." },
        { src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-03.jpg", alt: "Side of walnut card tray with card groove and recessed card area." },
        { src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-04.jpg", alt: "Walnut card tray filled with cards and card angled in dedicated groove." }
      ].map((image, index) => (
        <div 
          key={index}
          className="group relative overflow-hidden rounded-2xl"
        >
          {/* Glow border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"></div>
          
          {/* Image container */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
            />
            
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Bottom gradient accent */}
  <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
</div>

      </div>
    </div>
  );
}
