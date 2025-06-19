'use client';

import Navbar from '@/components/Navbar';
import CarritoContent from './components/CarritoContent';

export default function CarritoPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen w-full animate-gradient-x bg-animated-gradient bg-[length:300%_300%] flex flex-col items-center py-20 px-6">
        {/* Círculos decorativos */}
        <div className="absolute top-100 left-0 w-72 h-72 bg-pink-300 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000" />

        {/* Contenido principal */}
        <div className="w-full max-w-4xl backdrop-blur-md bg-white/60 p-10 rounded-xl shadow-md z-10">
          <CarritoContent />
        </div>
      </main>
    </>
  );
}
