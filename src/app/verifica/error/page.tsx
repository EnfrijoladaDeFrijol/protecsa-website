'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function VerificaErrorPage() {
  return (
    <main className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] bg-[#ff4d4f] rounded-full opacity-25 animate-float1"
          style={{ top: '-100px', right: '-120px' }}
        />
        <div
          className="absolute w-[600px] h-[600px] bg-[#facc15] rounded-full opacity-20 animate-float2"
          style={{ bottom: '-150px', left: '-150px' }}
        />
        <div
          className="absolute w-[400px] h-[400px] bg-[#f87171] rounded-full opacity-25 animate-float3"
          style={{ top: '30%', left: '35%' }}
        />
      </div>

      <div className="z-10 w-full max-w-md px-6">
        <div className="bg-white/80 border border-white/30 p-10 rounded-3xl shadow-2xl max-w-md w-full space-y-6 text-center">
          <div className="flex justify-center">
            <Image
              src="/logo_P.png"
              alt="Logo PROTECSA"
              width={80}
              height={80}
              className="mb-2"
            />
          </div>

          <h2 className="text-3xl font-extrabold text-red-600 tracking-wide">
            ¡Error al verificar tu correo!
          </h2>
          <p className="text-sm text-gray-600 -mt-2">
            El enlace es inválido, ha expirado o ya ha sido usado. Por favor, solicita otro desde el registro.
          </p>

          <Link
            href="/"
            className="inline-block mt-6 text-sm font-semibold border border-red-600 text-red-600 px-5 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
