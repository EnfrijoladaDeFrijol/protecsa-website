'use client';


import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import NavbarDesktop from './navbar/NavbarDesktop';
import NavbarMobile from './navbar/NavbarMobile';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('/avatar/default.png');
  const [userRole, setUserRole] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const loadUserFromSupabase = async () => {
    const stored = localStorage.getItem('user');
    const localUser = stored ? JSON.parse(stored) : null;

    if (localUser?.id) {
      const { data, error } = await supabase
        .from('User')
        .select('avatar, rol')
        .eq('id', localUser.id)
        .single();

      if (!error) {
        setAvatarUrl(`/avatar/${data.avatar || localUser?.avatar || 'default.png'}`);
        setUserRole(data.rol || '');
        localStorage.setItem('user', JSON.stringify({ ...localUser, avatar: data.avatar, rol: data.rol }));
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
        setUserRole(parsed.rol || '');
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
    setUserRole('');
    router.push('/');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-[96px] left-0 w-full h-[calc(100vh-96px)] bg-black/40 backdrop-blur-lg z-40 md:hidden transition-all duration-300" />
      )}

      <nav
        className="bg-[length:200%_200%] animate-gradient-cycle sticky top-0 z-50 text-white py-5 px-6 md:px-12 flex items-center justify-between backdrop-blur shadow-md"
        style={{ backgroundImage: `linear-gradient(to right, #003ce5, #4959ff, #E4B045, #E4B045, #003ce5)` }}
      >
        <NavbarDesktop
          pathname={pathname}
          userName={userName}
          avatarUrl={avatarUrl}
          userRole={userRole}
          dropdownRef={dropdownRef}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          handleLogout={handleLogout}
        />
        <NavbarMobile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pathname={pathname}
          userName={userName}
          avatarUrl={avatarUrl}
          userRole={userRole}
          handleLogout={handleLogout}
        />
      </nav>
    </>
  );
}
