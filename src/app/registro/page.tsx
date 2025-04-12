'use client';

import RegistroForm from './components/RegistroForm';

export default function RegistroPage() {
  return (
    <main className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Círculos decorativos grandes con posiciones distintas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] bg-[#003ce5] rounded-full opacity-25 animate-float1"
          style={{ top: '-100px', right: '-120px' }}
        />
        <div
          className="absolute w-[600px] h-[600px] bg-[#E4B045] rounded-full opacity-20 animate-float2"
          style={{ bottom: '-150px', left: '-150px' }}
        />
        <div
          className="absolute w-[400px] h-[400px] bg-[#4a9ae9] rounded-full opacity-25 animate-float3"
          style={{ top: '30%', left: '35%' }}
        />
      </div>

      {/* Formulario */}
      <div className="z-10 w-full max-w-md px-6">
        <RegistroForm />
      </div>
    </main>
  );
}
