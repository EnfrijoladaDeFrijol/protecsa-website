'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
          <nav
          className="bg-[length:200%_200%] animate-gradient-cycle sticky top-0 z-50 text-white py-5 px-6 md:px-12 flex items-center justify-between backdrop-blur shadow-md"
          style={{
            backgroundImage: `linear-gradient(
              to right,
              #003ce5,
              #4959ff,
              #E4B045,
              #E4B045,
              #003ce5
            )`,
          }}
        >
      {/* LOGO */}
      <Link href="/">
        <div className="flex items-center space-x-3 cursor-pointer">
          <Image
            src="/logo_blan.png"
            alt="Logo PROTECSA"
            width={65}
            height={65}
            className="object-contain"
          />
          <span className="text-xl font-bold tracking-wide">PROTECSA</span>
        </div>
      </Link>

      {/* NAV LINKS (desktop) */}
      <ul className="hidden md:flex space-x-4 font-medium ml-8">
        {[
          { name: 'Inicio', href: '/' },
          { name: 'Cursos', href: '/cursos' },
          { name: 'Misión', href: '/mision' },
          { name: 'Contacto', href: '/contacto' },
        ].map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="text-lg px-4 py-2 rounded-full hover:bg-white hover:text-blue-800 hover:scale-105 shadow-none transition duration-300 ease-in-out"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>

      {/* LOGIN / REGISTER BUTTONS (desktop) */}
      <div className="hidden md:flex items-center space-x-4">
        <a
          href="/login"
          className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-800 hover:scale-105 shadow-md transition duration-300 ease-in-out"
        >
          Iniciar sesión
        </a>
        <a
          href="/registro"
          className="px-6 py-2 rounded-full bg-white text-blue-800 hover:bg-yellow-400 hover:text-white hover:scale-105 shadow-md transition duration-300 ease-in-out"
        >
          Registrarse
        </a>
      </div>

      {/* BOTÓN HAMBURGUESA (móvil) */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

          {/* MENÚ MÓVIL CON ANIMACIÓN */}
          <div
            className={`absolute top-26 left-0 w-full text-white flex shadow-md flex-col items-center space-y-4 py-6 md:hidden z-50 transform transition-all duration-300 ease-in-out bg-[length:200%_200%] animate-gradient-cycle ${
              isOpen ? 'scale-y-100' : 'scale-y-0'
            }`}
            style={{
              transformOrigin: 'top',
              backgroundImage: `linear-gradient(
                to right,
                #003ce5,
                #4959ff,
                #E4B045,
                #E4B045,
                #003ce5
              )`,
            }}
          >
        {/* Navegación */}
        {[
          { name: 'Inicio', href: '/' },
          { name: 'Cursos', href: '/cursos' },
          { name: 'Misión', href: '/mision' },
          { name: 'Contacto', href: '/contacto' },
        ].map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-xl font-medium hover:text-yellow-300 transition"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </a>
        ))}

        {/* Línea divisora */}
        <hr className="w-3/4 border-t border-white/30 my-10" />

        {/* Botones destacados */}
        <div className="text-lg flex flex-col items-center space-y-3">
          <a
            href="/login"
            className="px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-800 hover:scale-105 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Iniciar sesión
          </a>
          <a
            href="/registro"
            className="px-6 py-2 rounded-full bg-white text-blue-800 hover:bg-yellow-400 hover:text-white hover:scale-105 transition duration-300 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Registrarse
          </a>
        </div>
      </div>
    </nav>
  );
}
