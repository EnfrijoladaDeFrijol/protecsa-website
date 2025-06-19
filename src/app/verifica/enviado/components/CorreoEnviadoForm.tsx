'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CorreoEnviadoForm() {
  return (
    <div className="bg-white/80 border border-white/30 p-10 rounded-3xl shadow-2xl max-w-md w-full space-y-6 text-center relative overflow-hidden">
      {/* Burbuja de fondo suave */}
      <div className="absolute w-[400px] h-[400px] bg-[#e6f0ff] rounded-full opacity-40 -top-20 -left-20 z-0" />

      <div className="relative z-10 flex justify-center">
        <Image
          src="/icon/sent.png"
          alt="Correo enviado"
          width={120}
          height={120}
          className="mb-4"
        />
      </div>

      <h2 className="text-2xl font-extrabold text-[#003ce5] z-10 relative">Revisa tu correo</h2>

      <p className="text-gray-600 text-sm z-10 relative">
        Hemos enviado un correo de verificación a la dirección que registraste.
      </p>

      <p className="text-xs text-gray-500 z-10 relative">
        Si no lo encuentras, revisa tu bandeja de spam o correo no deseado.
      </p>

      <Link
        href="/"
        className="inline-block mt-4 text-sm font-semibold border border-[#003ce5] text-[#003ce5] px-5 py-2 rounded-full hover:bg-[#003ce5] hover:text-white transition-all duration-300 z-10 relative"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
