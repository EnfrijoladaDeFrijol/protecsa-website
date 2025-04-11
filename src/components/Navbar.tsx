'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      style={{ backgroundImage: 'linear-gradient(to right, #003ce5, #E4B045)' }}
      className="sticky top-0 z-50 text-white py-4 px-6 md:px-12 flex justify-between items-center backdrop-blur shadow-md"
    >
      {/* Logo + título */}
      <div className="flex items-center space-x-3">
        <Image
          src="/logo_amar.png"
          alt="Logo PROTECSA"
          width={45}
          height={45}
          className="object-contain"
        />
        <span className="text-xl font-bold tracking-wide">PROTECSA</span>
      </div>

      {/* Botón hamburguesa (solo móvil) */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          {isOpen ? (
            /* Ícono "X" (cerrar) */
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            /* Ícono ☰ (abrir) */
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Menú (desktop) */}
      <ul className="hidden md:flex space-x-5 font-medium">
        {[
          { name: 'Inicio', href: '/' },
          { name: 'Cursos', href: '/cursos' },
          { name: 'Misión', href: '/mision' },
          { name: 'Contacto', href: '/contacto' },
        ].map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="px-4 py-2 rounded-md hover:bg-white hover:text-blue-800 transition duration-300"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Menú (móvil) */}
      {isOpen && (
        <ul className="absolute top-20 left-0 w-full bg-blue-700 text-white flex flex-col items-center space-y-4 py-6 md:hidden z-50 shadow-lg">
          {[
            { name: 'Inicio', href: '/' },
            { name: 'Cursos', href: '/cursos' },
            { name: 'Misión', href: '/mision' },
            { name: 'Contacto', href: '/contacto' },
          ].map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-lg font-medium hover:text-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
