'use client';

import { useEffect, useState } from 'react';
import { HiClipboard, HiCheck } from 'react-icons/hi';
import { UserCircle } from 'lucide-react';

type Usuario = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
};

export default function PerfilInfo() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const copiarId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  if (!user) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-xl shadow-lg mb-12 bg-white px-4 py-16 overflow-hidden flex flex-col items-center text-center space-y-4">
      {/* Círculos estáticos decorativos tipo float */}
      <div className="absolute w-[350px] h-[350px] bg-[#E4B045] rounded-full opacity-20 animate-float1" style={{ top: '-100px', left: '-120px' }} />
      <div className="absolute w-[400px] h-[400px] bg-[#003ce5] rounded-full opacity-20 animate-float2" style={{ top: '10%', right: '-180px' }} />
      <div className="absolute w-[300px] h-[300px] bg-[#4a9ae9] rounded-full opacity-20 animate-float3" style={{ bottom: '-100px', left: '25%' }} />

      {/* Contenido visible */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <UserCircle className="w-28 h-28 text-[#003ce5]" />
        <h2 className="text-4xl font-bold text-[#000000]">{user.nombre} {user.apellido}</h2>

        <div className="flex items-center gap-2 text-gray-600 text-sm break-all">
          <span>{user.id}</span>

          <button
            onClick={copiarId}
            className="text-[#3a3a3a] hover:text-[#4959ff] transition transform hover:scale-110 duration-200 ease-in-out"
          >
            
            {copiado ? <HiCheck className="w-5 h-5 text-green-500" /> : <HiClipboard className="w-5 h-5" />}
          </button>
        </div>

        <div className="bg-white/60 text-[#003ce5] px-4 py-2 rounded-lg shadow-md backdrop-blur-md ring-1 ring-[#003ce5]/10 w-full max-w-sm mx-auto">
          <span className="font-semibold text-sm block text-center break-all">
            {user.email}
          </span>
        </div>
      </div>
    </div>
  );

}
