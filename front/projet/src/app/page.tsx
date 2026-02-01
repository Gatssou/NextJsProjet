"use client";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-black-500" >
      <Header />
      <section className="p-10 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-black">section </h2>
        <p className="mt-4 text-black">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim in beatae earum reiciendis dignissimos ipsa, accusantium a at facilis repellat nulla consequatur deleniti cumque dicta non ducimus repellendus. Id, voluptatem?
        </p>
      </section>
        <Footer />
    </main>
  );
}
