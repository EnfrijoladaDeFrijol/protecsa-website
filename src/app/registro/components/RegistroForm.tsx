'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function RegistroForm() {
  return (
    <div className="bg-white/80 border border-white/30 p-10 rounded-3xl shadow-2xl max-w-md w-full space-y-6 text-center">
      {/* Logo */}
      <div className="flex justify-center">
        <Image
          src="/logo_P.png"
          alt="Logo PROTECSA"
          width={70}
          height={70}
          className="mb-2"
        />
      </div>

      {/* Título */}
      <h2 className="text-3xl font-extrabold text-[#003ce5] tracking-wide">Regístrate</h2>
      <p className="text-sm text-gray-600 -mt-2">Únete a la comunidad PROTECSA</p>

      {/* Formulario */}
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          className="px-4 py-3 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="px-4 py-3 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="px-4 py-3 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="px-4 py-3 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm"
        />

        {/* Botón de registro (con degradado invertido) */}
        <button
          type="submit"
          className="relative bg-gradient-to-r from-[#E4B045] via-[#318ce7] to-[#003ce5] bg-[length:200%_200%] animate-gradient-cycle text-white font-semibold py-3 rounded-full shadow-md hover:scale-105 transition-all"
        >
          Crear cuenta
        </button>
      </form>

      {/* Link para volver a iniciar sesión */}
      <div className="pt-3">
        <p className="text-sm text-gray-700">
          ¿Ya tienes cuenta?{' '}
          <Link
            href="/login"
            className="font-semibold border-[#003ce5] text-[#003ce5] px-1 py-2 rounded-full inline-block mt-2  hover:text-blue-500 transition"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-block mt-4 text-sm font-semibold border border-[#003ce5] text-[#003ce5] px-5 py-2 rounded-full hover:bg-[#003ce5] hover:text-white transition-all duration-300"
        >
          ⬅ Volver al inicio
        </Link>
      </div>
    </div>
  );
}
