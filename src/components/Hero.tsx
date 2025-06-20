'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-white py-28 sm:py-36 text-center px-4 relative overflow-hidden">
      {/* Fondo degradado sin animación */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-300 via-blue-50 to-white pointer-events-none opacity-80 z-0" />
      {/* Contenido con animaciones */}
      <div className="relative z-10" data-aos="fade-up" data-aos-once="true" data-aos-duration="600">
        {/* Título */}
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-[#1e40af] mb-6">
          Bienvenido a{' '}
          <span className="bg-gradient-to-r font-extrabold from-[#eca712] to-[#f7b709] text-transparent bg-clip-text animate-pulse">
            PROTECSA
          </span>
        </h1>

        {/* Descripción */}
        <p className="text-gray-700 text-xl sm:text-2xl font-medium max-w-3xl mx-auto mb-12">
          <span className="text-black-700 font-semibold">Cursos intersemestrales</span>,{' '}
          <span className="text-black-700 font-semibold">asesorías</span>,{' '}
          <span className="text-black-700 font-semibold">talleres</span>,{' '}
          <span className="text-black-700 font-semibold">capacitación</span> y mucho más.
        </p>

        {/* Botones */}
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
