'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SobreNosotros from '../components/SobreNosotros';
import CarruselCursos from '../components/CarruselCursos';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SobreNosotros />
      <CarruselCursos />
      
      <Footer />
    </>
  );
}
