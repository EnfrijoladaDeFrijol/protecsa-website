'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaShoppingCart, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        //  Mostramos nombre completo si existe
        const fullName = `${parsed.nombre || ''} ${parsed.apellido || ''}`.trim();
        setUserName(fullName || parsed.email || 'Usuario');
      } catch {
        setUserName('Usuario');
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserName(null);
    router.push('/');
  };

  return (
    <nav
      className="bg-[length:200%_200%] animate-gradient-cycle sticky top-0 z-50 text-white py-5 px-6 md:px-12 flex items-center justify-between backdrop-blur shadow-md"
      style={{
        backgroundImage: `linear-gradient(to right, #003ce5, #4959ff, #E4B045, #E4B045, #003ce5)`,
      }}
    >
      {/* LOGO */}
      <Link href="/">
        <div className="flex items-center space-x-3 cursor-pointer">
          <Image src="/logo_blan.png" alt="Logo PROTECSA" width={65} height={65} className="object-contain" />
          <span className="text-xl font-bold tracking-wide">PROTECSA</span>
        </div>
      </Link>

      {/* NAV LINKS */}
      <ul className="hidden md:flex space-x-6 font-medium ml-8">
        {[
          { name: 'Inicio', href: '/' },
          { name: 'Cursos', href: '/cursos' },
          { name: 'Misión', href: '/mision' },
          { name: 'Contacto', href: '/contacto' },
        ].map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-lg px-4 py-2 rounded-full hover:bg-white hover:text-blue-800 hover:scale-105 transition duration-300"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* SESIÓN - DESKTOP */}
      <div className="hidden md:flex items-center space-x-4 relative">
        {userName ? (


          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300
                ${showMenu
                  ? 'bg-white text-blue-800 border-white shadow-md'
                  : 'bg-transparent text-white border-white hover:bg-white hover:text-blue-800 hover:shadow-md hover:scale-105'
                } text-base font-bold`}
            >
              <FaUserCircle className="text-xl" />
              <span>{userName}</span>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl z-50 py-2 ring-1 ring-gray-200">
                <Link
                  href="/perfil"
                  className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm transition"
                >
                  <FaUserEdit className="text-base" />
                  Editar perfil
                </Link>
                <Link
                  href="/carrito"
                  className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm transition"
                >
                  <FaShoppingCart className="text-base" />
                  Mi carrito
                </Link>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm transition"
                >
                  <FaSignOutAlt className="text-base" />
                  Cerrar sesión
                </button>
              </div>


            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-800 hover:scale-105 transition">
              Iniciar sesión
            </Link>
            <Link href="/registro" className="px-6 py-2 rounded-full bg-white text-blue-800 hover:bg-yellow-400 hover:text-white hover:scale-105 transition">
              Registrarse
            </Link>
          </>
        )}
      </div>

      {/* BOTÓN HAMBURGUESA */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* MENÚ MÓVIL */}
      <div
        className={`absolute top-26 left-0 w-full text-white flex flex-col items-center space-y-4 py-6 md:hidden z-50 transform transition-all duration-300 ease-in-out bg-[length:200%_200%] animate-gradient-cycle ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{
          transformOrigin: 'top',
          backgroundImage: `linear-gradient(to right, #003ce5, #4959ff, #E4B045, #E4B045, #003ce5)`,
        }}
      >
        {[
          { name: 'Inicio', href: '/' },
          { name: 'Cursos', href: '/cursos' },
          { name: 'Misión', href: '/mision' },
          { name: 'Contacto', href: '/contacto' },
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-xl font-medium hover:text-yellow-300 transition"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}

        <hr className="w-3/4 border-t border-white/30 my-6" />

        {userName ? (
          <div className="flex flex-col items-center w-full px-6 space-y-4">
            {/* Contenedor del menú centrado */}
            <div className="flex flex-col items-center w-full max-w-sm space-y-4">

              {/* Nombre del usuario */}
              <div className="flex flex-col items-center bg-white px-4 py-3 rounded-full shadow-sm w-fit mx-auto text-center space-y-1">
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-blue-800 text-xl" />
                  <span className="text-blue-800 font-bold text-base sm:text-lg px-3.5">{userName}</span>
                </div>
              </div>

              {/* Opciones del menú */}
              <div className="flex flex-col items-center w-full space-y-3 text-white text-base">
                <Link
                  href="/perfil"
                  className="flex items-center gap-2 px-4 py-2 hover:text-yellow-300 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserEdit className="text-lg" />
                  <span>Editar perfil</span>
                </Link>

                <Link
                  href="/carrito"
                  className="flex items-center gap-2 px-4 py-2 hover:text-yellow-300 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FaShoppingCart className="text-lg" />
                  <span>Mi carrito</span>
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:text-yellow-300 transition border border-white-800 rounded-full"
                >
                  {/*   <FaSignOutAlt className="text-lg" />   */}
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>
          </div>

        ) : (
          <div className="flex flex-col items-center space-y-3">
            <Link
              href="/login"
              className="px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-800 transition"
              onClick={() => setIsOpen(false)}
            >
              Iniciar sesión
            </Link>
            <Link
              href="/registro"
              className="px-6 py-2 rounded-full bg-white text-blue-800 hover:bg-yellow-400 hover:text-white transition font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
