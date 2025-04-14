'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarruselCursos from './components/CarruselCursos';

export default function CursosPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Navbar />

      <section className="pt-28 pb-16 bg-gradient-to-br from-[#f0f4ff] to-[#e4f0ff] min-h-screen px-6">
        <div className="max-w-7xl mx-auto text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800">Nuestros Cursos</h1>
          <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
            Descubre una variedad de cursos diseñados para impulsar tus habilidades.
          </p>
        </div>

        {/* Carrusel de cursos individuales en tarjetas animadas */}
        <CarruselCursos />
      </section>

      <Footer />
    </>
  );
}
