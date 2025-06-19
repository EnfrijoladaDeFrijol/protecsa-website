'use client';

import Navbar from '@/components/Navbar';
import MisionSection from './components/MisionSection';

export default function MisionPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-gradient-to-br from-[#ffffff] to-[#e4f0ff] px-6 py-20">
        {/* Blobs de fondo suaves */}
        <div className="absolute top-[50px] left-0 w-64 h-64 bg-[#4a7bd4] opacity-10 rounded-full mix-blend-multiply filter blur-md animate-blob" />
        <div className="absolute top-[500px] right-90 w-64 h-64 bg-[#e4b045] opacity-10 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-[#4a9ae9] opacity-10 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-4000" />
        <div className="absolute top-[1500px] left-100 w-56 h-56 bg-[#ffa500] opacity-10 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-3000" />


        {/* Contenido de la sección */}
        <div className="relative z-10">
          <MisionSection />
        </div>
      </main>
    </>
  );
}
