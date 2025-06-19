'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function VerificaForm() {
  return (
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

      <h2 className="text-3xl font-extrabold text-[#003ce5] tracking-wide">
        ¡Correo verificado con éxito!
      </h2>
      <p className="text-sm text-gray-600 -mt-2">
        Tu cuenta ha sido activada. Ya puedes iniciar sesión con tu correo verificado.
      </p>

      <Link
        href="/login"
        className="inline-block mt-6 text-sm font-semibold border border-[#003ce5] text-[#003ce5] px-5 py-2 rounded-full hover:bg-[#003ce5] hover:text-white transition-all duration-300"
      >
        Iniciar sesión
      </Link>
    </div>
  );
}
