'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaSignOutAlt, FaUserEdit, FaPlusCircle } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';


interface Props {
  pathname: string;
  userName: string | null;
  avatarUrl: string;
  userRole: string;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  handleLogout: () => void;
}

export default function NavbarDesktop({
  pathname,
  userName,
  avatarUrl,
  userRole,
  dropdownRef,
  showMenu,
  setShowMenu,
  handleLogout,
}: Props) {
  return (
    <>
      <Link href="/">
        <div className="flex items-center space-x-3 cursor-pointer">
          <Image src="/logo_blan.png" alt="Logo PROTECSA" width={65} height={65} className="object-contain" />
          <span className="text-xl font-bold tracking-wide drop-shadow-sm">PROTECSA</span>
        </div>
      </Link>

      <ul className="hidden md:flex space-x-6 font-medium ml-8">
        {[{ name: 'Inicio', href: '/' }, { name: 'Cursos', href: '/cursos' }, { name: 'Misión', href: '/mision' }, { name: 'Contacto', href: '/contacto' }].map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`text-lg px-4 py-2 rounded-full transition-all duration-200 ease-in-out drop-shadow-sm ${pathname === item.href ? 'bg-white text-blue-800' : 'text-white hover:bg-white hover:text-blue-800 hover:scale-105'}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex items-center space-x-4 relative">
        {userName ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="group relative p-1 rounded-full transition-transform duration-300 hover:scale-105"
            >
              <div className="p-[2px] bg-gradient-to-tr from-blue-600 via-white to-yellow-500 rounded-full group-hover:shadow-lg transition-all duration-300">
                <Image src={avatarUrl} alt="Avatar" width={52} height={52} className="rounded-full object-cover border-2 border-white" />
              </div>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl z-50 ring-1 ring-gray-200 p-4 space-y-3">
                <div className="flex items-center gap-3 border-b pb-3 border-gray-300">
                  <Image src={avatarUrl} alt="Avatar" width={48} height={48} className="rounded-full border-2 border-blue-800 object-cover" />
                  <div className="text-left">
                    <p className="font-semibold text-blue-900">{userName}</p>
                    <p className="text-xs text-gray-600">{userRole}</p>
                  </div>
                </div>

                <Link href="/perfil" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 text-blue-900 transition text-sm">
                  <FaUserEdit className="text-base" />
                  Editar perfil
                </Link>

                {userRole === 'Estudiante' && (
                  <Link href="/carrito" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 text-blue-900 transition text-sm">
                    <FaShoppingCart className="text-base" />
                    Mi carrito
                  </Link>
                )}

                {(userRole === 'Becario' || userRole === 'Administrador') && (
                  <Link href="/nuevo_curso" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 text-blue-900 transition text-sm">
                    <FaPlusCircle className="text-base" />
                    Crear curso
                  </Link>
                )}
                {userRole === 'Administrador' && (
                  <Link href="/admin/autorizar_cursos" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 text-blue-900 transition text-sm">
                    <FaCheckCircle className="text-base" />
                    Autorizar cursos
                  </Link>
                )}


                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-100 text-red-700 transition text-sm">
                  <FaSignOutAlt className="text-base" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="px-5 py-2 rounded-full text-white border-2 border-white hover:bg-white hover:text-blue-800 hover:scale-105 transition duration-300 font-medium shadow-sm">Iniciar sesión</Link>
            <Link href="/registro" className="px-5 py-2 rounded-full bg-white text-blue-800 font-semibold hover:bg-yellow-400 hover:text-white hover:scale-105 transition duration-300 shadow-sm">Registrarse</Link>
          </>
        )}
      </div>
    </>
  );
}
