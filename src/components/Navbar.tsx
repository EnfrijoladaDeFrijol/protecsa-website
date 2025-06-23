'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FaShoppingCart, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('/avatar/default.png');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const loadUserFromSupabase = async () => {
    const stored = localStorage.getItem('user');
    const localUser = stored ? JSON.parse(stored) : null;

    if (localUser?.id) {
      const { data, error } = await supabase
        .from('User')
        .select('avatar')
        .eq('id', localUser.id)
        .single();

      if (!error && data?.avatar) {
        setAvatarUrl(`/avatar/${data.avatar}`);
        localStorage.setItem('user', JSON.stringify({ ...localUser, avatar: data.avatar }));
      } else {
        setAvatarUrl(`/avatar/${localUser?.avatar || 'default.png'}`);
      }
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const primerNombre = (parsed.nombre || '').split(' ')[0];
        const primerApellido = (parsed.apellido || '').split(' ')[0];
        const fullName = `${primerNombre} ${primerApellido}`.trim();
        setUserName(fullName || parsed.email || 'Usuario');
      } catch {
        setUserName('Usuario');
      }
    }

    loadUserFromSupabase();
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
    <>
      {/* Fondo blur detrás del menú móvil */}
      {isOpen && (
        <div className="fixed top-[96px] left-0 w-full h-[calc(100vh-96px)] bg-black/40 backdrop-blur-lg z-40 md:hidden transition-all duration-300" />
      )}

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
            <span className="text-xl font-bold tracking-wide drop-shadow-sm">PROTECSA</span>
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
                className={`text-lg px-4 py-2 rounded-full transition-all duration-200 ease-in-out drop-shadow-sm ${
                  pathname === item.href
                    ? 'bg-white text-blue-800'
                    : 'text-white hover:bg-white hover:text-blue-800 hover:scale-105'
                }`}
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
                className="group relative p-1 rounded-full transition-transform duration-300 hover:scale-105"
              >
                <div className="p-[2px] bg-gradient-to-tr from-blue-600 via-white to-yellow-500 rounded-full group-hover:shadow-lg transition-all duration-300">
                  <Image
                    src={avatarUrl}
                    alt="Avatar"
                    width={52}
                    height={52}
                    className="rounded-full object-cover border-2 border-white"
                  />
                </div>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl z-50 ring-1 ring-gray-200 p-4 space-y-3">
                  <div className="flex items-center gap-3 border-b pb-3 border-gray-300">
                    <Image
                      src={avatarUrl}
                      alt="Avatar"
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-blue-800 object-cover"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-blue-900">{userName}</p>
                      <p className="text-xs text-gray-600">¡Nos alegra verte!</p>
                    </div>
                  </div>

                  <Link
                    href="/perfil"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 text-blue-900 transition text-sm"
                  >
                    <FaUserEdit className="text-base" />
                    Editar perfil
                  </Link>

                  <Link
                    href="/carrito"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 text-blue-900 transition text-sm"
                  >
                    <FaShoppingCart className="text-base" />
                    Mi carrito
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-100 text-red-700 transition text-sm"
                  >
                    <FaSignOutAlt className="text-base" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-full text-white border-2 border-white hover:bg-white hover:text-blue-800 hover:scale-105 transition duration-300 font-medium shadow-sm"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                className="px-5 py-2 rounded-full bg-white text-blue-800 font-semibold hover:bg-yellow-400 hover:text-white hover:scale-105 transition duration-300 shadow-sm"
              >
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
          className={`absolute top-26 left-0 w-full text-white flex flex-col items-center space-y-6 py-6 md:hidden z-50 transform transition-all duration-300 ease-in-out bg-[length:200%_200%] animate-gradient-cycle ${
            isOpen ? 'scale-y-100' : 'scale-y-0'
          }`}
          style={{
            transformOrigin: 'top',
            backgroundImage: `linear-gradient(to right, #003ce5, #4959ff, #d89e29, #d89e29, #003ce5)`,
          }}
        >
          <div className="w-full max-w-sm px-4 py-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-md flex flex-wrap justify-center gap-3">
            {[
              { name: 'Inicio', href: '/' },
              { name: 'Cursos', href: '/cursos' },
              { name: 'Misión', href: '/mision' },
              { name: 'Contacto', href: '/contacto' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`w-[45%] text-center text-base font-semibold px-4 py-2 rounded-full transition ${
                  pathname === item.href
                    ? 'bg-white text-blue-800'
                    : 'hover:bg-white/20 text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <hr className="w-3/4 border-t border-white/30 my-4" />

          {userName && (
            <div className="w-full max-w-sm px-4 py-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-md flex flex-col items-center space-y-6 text-center">
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  width={56}
                  height={56}
                  className="rounded-full object-cover border-2 border-blue-800 shadow-sm"
                />
                <div className="text-left">
                  <p className="text-white font-bold text-base sm:text-lg">{userName}</p>
                  <p className="text-white/80 text-sm">¡Nos alegra verte!</p>
                </div>
              </div>

              <div className="flex flex-col items-center w-full space-y-3 text-white font-medium">
                <Link
                  href="/perfil"
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition text-base"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserEdit className="text-lg" />
                  <span>Editar perfil</span>
                </Link>
                <Link
                  href="/carrito"
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition text-base"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-800 hover:bg-yellow-400 transition text-base"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
