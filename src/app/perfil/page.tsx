'use client';

import Navbar from '@/components/Navbar';
import PerfilForm from './components/PerfilForm';
import CambiarPasswordForm from './components/CambiarPasswordForm';

export default function PerfilPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen w-full bg-gradient-to-br from-[#f0f4ff] to-[#e4f0ff] flex flex-col items-center py-20 px-6">
        {/* Círculos animados tipo blob */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#003ce5] opacity-20 rounded-full mix-blend-multiply filter blur-md animate-blob" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#e4b045] opacity-20 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-[#4a9ae9] opacity-20 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-4000" />


        {/* Contenido principal */}
        <div className="w-full max-w-5xl backdrop-blur-md bg-white/60 p-10 rounded-xl shadow-md z-10">

          <PerfilForm />
          <div className="border-t border-blue-200 my-10" />
          <CambiarPasswordForm />
        </div>
      </main>
    </>
  );
}
