'use client';

import { useEffect, useState } from 'react';
import { HiClipboard, HiCheck } from 'react-icons/hi';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import AvatarSelectorPortal from './AvatarSelectorPortal';

type Usuario = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  avatar: string;
  rol: string;
};

const getColorFondoBoton = (rol: string) => {
  switch (rol.toLowerCase()) {
    case 'administrador':
      return 'bg-black hover:bg-gray-800';
    case 'becario':
      return 'bg-[#e4b045] hover:bg-yellow-500';
    case 'estudiante':
      return 'bg-[#003ce5] hover:bg-blue-600';
    default:
      return 'bg-gray-400 hover:bg-gray-500';
  }
};

export default function PerfilInfo() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const stored = localStorage.getItem('user');
      const localUser = stored ? JSON.parse(stored) : null;

      if (localUser?.id) {
        const { data, error } = await supabase
          .from('User')
          .select('id, nombre, apellido, email, avatar, rol')
          .eq('id', localUser.id)
          .single();

        if (!error && data) {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        } else {
          console.error('❌ Error al obtener datos actualizados:', error);
          setUser(localUser); // fallback
        }
      }
    };

    fetchUser();
  }, []);

  const copiarId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  const actualizarAvatar = async (nuevoAvatar: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('User')
      .update({ avatar: nuevoAvatar })
      .eq('id', user.id);

    if (!error) {
      const actualizado = { ...user, avatar: nuevoAvatar };
      setUser(actualizado);
      localStorage.setItem('user', JSON.stringify(actualizado));
      setShowAvatars(false);
    } else {
      console.error('Error al actualizar avatar:', error);
    }
  };

  const getRolEstilo = (rol: string) => {
    switch (rol.toLowerCase()) {
      case 'administrador':
        return 'bg-black text-white font-bold';
      case 'becario':
        return 'bg-yellow-400 text-gray-900 font-semibold';
      case 'estudiante':
        return 'bg-blue-100 text-blue-800 font-medium';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getBordeColor = (rol: string) => {
    switch (rol.toLowerCase()) {
      case 'administrador':
        return 'border-black';
      case 'becario':
        return 'border-[#e4b045]';
      case 'estudiante':
        return 'border-[#003ce5]';
      default:
        return 'border-gray-300';
    }
  };

  if (!user) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-xl bg-white/60 backdrop-blur-md shadow-lg mb-12 px-6 py-20 overflow-hidden flex flex-col items-center text-center space-y-4">
      {/* Círculos decorativos */}
      <div className="absolute w-[350px] h-[350px] bg-[#E4B045] rounded-full opacity-20 animate-float1" style={{ top: '-100px', left: '-120px' }} />
      <div className="absolute w-[400px] h-[400px] bg-[#003ce5] rounded-full opacity-20 animate-float2" style={{ top: '10%', right: '-180px' }} />
      <div className="absolute w-[300px] h-[300px] bg-[#4a9ae9] rounded-full opacity-20 animate-float3" style={{ bottom: '-100px', left: '25%' }} />

      {/* Avatar con botón */}
      <div className="relative">
        <Image
          src={`/avatar/${user.avatar || 'default.png'}?t=${Date.now()}`}
          alt="Avatar"
          width={150}
          height={150}
          className={`rounded-full shadow-lg object-cover border-4 ${getBordeColor(user.rol)}`}
        />
        <button
          onClick={() => setShowAvatars(true)}
          className={`absolute -bottom-0 -right-0 ${getColorFondoBoton(user.rol)} text-white rounded-full p-2 transition z-10`}
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>

      {/* Rol (con más separación) */}
      <div className="mt-4">
        <span className={`inline-block px-4 py-1 text-sm rounded-full shadow-sm ${getRolEstilo(user.rol)}`}>
          {user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}
        </span>
      </div>

      {/* Nombre */}
      <h2 className="text-5xl font-bold text-black mt-2">
        {user.nombre} {user.apellido}
      </h2>

      {/* Correo */}
      <div className="bg-white/60 text-[#003ce5] px-4 py-2 rounded-lg shadow-md backdrop-blur-md ring-1 ring-[#003ce5]/10 w-full max-w-sm mx-auto">
        <span className="font-semibold text-sm block text-center break-all">
          {user.email}
        </span>
      </div>

      {/* ID en esquina inferior derecha */}
      <div className="absolute bottom-4 right-6 flex items-center gap-2 text-gray-500 text-xs">
        <span className="max-w-[140px] truncate">{user.id}</span>
        <button
          onClick={copiarId}
          className="hover:text-[#4959ff] transition transform hover:scale-110 duration-200 ease-in-out"
        >
          {copiado ? <HiCheck className="w-4 h-4 text-green-500" /> : <HiClipboard className="w-4 h-4" />}
        </button>
      </div>

      {/* Selector de avatar */}
      {showAvatars && (
        <AvatarSelectorPortal
          onClose={() => setShowAvatars(false)}
          onSelect={actualizarAvatar}
        />
      )}
    </div>
  );
}
