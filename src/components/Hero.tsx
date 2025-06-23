'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-white py-28 sm:py-36 text-center px-4 relative overflow-hidden">
      {/* Fondo degradado estático original */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-yellow-50 to-white pointer-events-none opacity-90 z-0" />
      
      {/* Contenido con animaciones */}
      <div className="relative z-10" data-aos="fade-up" data-aos-once="true" data-aos-duration="600" >
        {/* Título con animación sutil */}
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-[#1e40af] mb-6">
          Bienvenido a{' '}
          <span className="bg-gradient-to-r font-extrabold from-[#eca712] to-[#e4b968] text-transparent bg-clip-text animate-none">
            PROTECSA
          </span>
        </h1>

        {/* Logos con animaciones suaves */}
        <div className="flex flex-row justify-center items-center gap-2 sm:gap-8 mb-10">
          {/* Logo UNAM */}
          <div 
            className="w-16 h-16 sm:w-30 sm:h-30 relative"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <a 
              href="https://www.unam.mx/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <Image 
                src="/logo_unam.png"
                alt="Logo UNAM"
                fill
                className="object-contain transition-all duration-500 ease-in-out hover:scale-115"
              />
            </a>
          </div>
          
          {/* Logo PROTECSA */}
          <div 
            className="w-20 h-20 sm:w-34 sm:h-34 relative"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <Image 
              src="/logo_P.png"
              alt="Logo PROTECSA"
              fill
              className="object-contain transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-115"
            />
          </div>
          
          {/* Logo Facultad de Ciencias */}
          <div 
            className="w-16 h-16 sm:w-32 sm:h-32 relative"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <a 
              href="https://www.fciencias.unam.mx/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <Image 
                src="/logo_ciencias.png"
                alt="Logo Facultad de Ciencias"
                fill
                className="object-contain transition-all duration-500 ease-in-out hover:scale-115"
              />
            </a>
          </div>
        </div>

        {/* Descripción*/}
        <p className="text-gray-700 text-xl sm:text-2xl font-medium max-w-3xl mx-auto mb-12">
          <span className="text-black-700 font-semibold">Cursos intersemestrales</span>,{' '}
          <span className="text-black-700 font-semibold">asesorías</span>,{' '}
          <span className="text-black-700 font-semibold">talleres</span>,{' '}
          <span className="text-black-700 font-semibold">capacitación y mucho más</span>.
        </p>

        {/* Botones originales con mejoras sutiles */}
        <div className="flex flex-row justify-center items-center gap-4 mt-4">
          <Link
            href="/cursos"
            className="text-lg px-8 py-4 rounded-full text-white bg-gradient-to-r from-[#4a9ae9] via-[#4959ff] to-[#003ce5] bg-[length:200%_200%] animate-gradient-x shadow-lg hover:scale-105 hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            Ver cursos
          </Link>
          <Link
            href="/contacto"
            className="text-lg px-8 py-4 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-100 hover:scale-105 hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </section>
  );
}