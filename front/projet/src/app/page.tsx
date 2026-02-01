"use client";
import Header from "./components/Header/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-black-500" >
      <Header />
      <section className="p-10 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-black">Bienvenue sur MonSite</h2>
        <p className="mt-4 text-black">
          Connectez-vous ou inscrivez-vous pour accéder à votre dashboard.
        </p>
      </section>
    </main>
  );
}
