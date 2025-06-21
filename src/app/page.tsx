'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SobreNosotros from '../components/SobreNosotros';
import CarruselCursos from '../components/CarruselCursos';
import CarruselAnuncios from '../components/anuncios/CarruselAnuncios';

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col gap-y-5 max-w-full overflow-x-hidden">

        <Hero />
        <CarruselAnuncios />
        <SobreNosotros />
        <CarruselCursos />
      </main>
    </>
  );
}
