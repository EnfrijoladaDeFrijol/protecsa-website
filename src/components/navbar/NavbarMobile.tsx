// components/navbar/NavbarMobile.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaSignOutAlt, FaUserEdit, FaPlusCircle } from 'react-icons/fa';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pathname: string;
  userName: string | null;
  avatarUrl: string;
  userRole: string;
  handleLogout: () => void;
}

export default function NavbarMobile({
  isOpen,
  setIsOpen,
  pathname,
  userName,
  avatarUrl,
  userRole,
  handleLogout,
}: Props) {
  return (
    <>
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div
        className={`absolute top-26 left-0 w-full text-white flex flex-col items-center space-y-6 py-6 md:hidden z-50 transform transition-all duration-300 ease-in-out bg-[length:200%_200%] animate-gradient-cycle ${isOpen ? 'scale-y-100' : 'scale-y-0'}`}
        style={{ transformOrigin: 'top', backgroundImage: `linear-gradient(to right, #003ce5, #4959ff, #d89e29, #d89e29, #003ce5)` }}
      >
        <div className="w-full max-w-sm px-4 py-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-md flex flex-wrap justify-center gap-3">
          {[{ name: 'Inicio', href: '/' }, { name: 'Cursos', href: '/cursos' }, { name: 'Misión', href: '/mision' }, { name: 'Contacto', href: '/contacto' }].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`w-[45%] text-center text-base font-semibold px-4 py-2 rounded-full transition ${pathname === item.href ? 'bg-white text-blue-800' : 'hover:bg-white/20 text-white'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <hr className="w-3/4 border-t border-white/30 my-4" />

        {userName && (
          <div className="w-full max-w-sm px-4 py-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-md flex flex-col items-center space-y-6 text-center">
            <div className="flex items-center justify-center gap-4">
              <Image src={avatarUrl} alt="Avatar" width={56} height={56} className="rounded-full object-cover border-2 border-blue-800 shadow-sm" />
              <div className="text-left">
                <p className="text-white font-bold text-base sm:text-lg">{userName}</p>
                <p className="text-white/80 text-sm">{userRole}</p>
              </div>
            </div>

            <div className="flex flex-col items-center w-full space-y-3 text-white font-medium">
              <Link href="/perfil" className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition text-base" onClick={() => setIsOpen(false)}>
                <FaUserEdit className="text-lg" />
                <span>Editar perfil</span>
              </Link>

              {userRole === 'Estudiante' && (
                <Link href="/carrito" className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition text-base" onClick={() => setIsOpen(false)}>
                  <FaShoppingCart className="text-lg" />
                  <span>Mi carrito</span>
                </Link>
              )}

              {(userRole === 'Becario' || userRole === 'Administrador') && (
                <Link href="/nuevo_curso" className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition text-base" onClick={() => setIsOpen(false)}>
                  <FaPlusCircle className="text-lg" />
                  <span>Crear curso</span>
                </Link>
              )}

              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-800 hover:bg-yellow-400 transition text-base"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
