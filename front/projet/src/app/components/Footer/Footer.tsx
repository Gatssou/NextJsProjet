"use client";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
      
      {/* Glow background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-3xl animate-pulse"></div>
      </div>

      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* LEFT – Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              JForPlay
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Plateforme dédiée aux passionnés d’animés, fan arts et jeux vidéo.
              Découvrez, partagez et soutenez les créateurs.
            </p>
          </div>

          {/* CENTER – Image */}
          <div className="flex justify-center">
            <div className="relative group w-40 h-40">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition"></div>
              <div className="relative w-full max-w-xs mx-auto">
  <div className="
    relative 
    overflow-hidden 
    rounded-2xl 
    border border-slate-700/50 
    bg-slate-900/50 
    backdrop-blur-sm

    aspect-[4/5]        /* Mobile */
    sm:aspect-[1/1]     /* Tablet */
    lg:aspect-[3/4]     /* Desktop */
  ">
    <img
      src="/images/homePage/2.jpg"
      alt="Anime mascot"
      className="
        absolute inset-0 
        w-full 
        object-cover
        object-center

        transition-transform duration-500
        group-hover:scale-105
      "
    />
  </div>
</div>
            </div>
          </div>

          {/* RIGHT – Links */}
          <div className="grid grid-cols-2 gap-8">
            
            {/* Navigation */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-4">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-cyan-400 transition">Accueil</li>
                <li className="hover:text-cyan-400 transition">Fan Arts</li>
                <li className="hover:text-cyan-400 transition">Jeux</li>
                <li className="hover:text-cyan-400 transition">Communauté</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-4">
                Légal
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-purple-400 transition">Mentions légales</li>
                <li className="hover:text-purple-400 transition">Politique de confidentialité</li>
                <li className="hover:text-purple-400 transition">RGPD</li>
                <li className="hover:text-purple-400 transition">Crédits artistes</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} JForPlay — Fan project. All rights belong to their respective owners.
          </p>

          <p className="text-xs text-slate-500">
            Made with for anime & gaming culture
          </p>
        </div>

      </div>
    </footer>
  );
}
