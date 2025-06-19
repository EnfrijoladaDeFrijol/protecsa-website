'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Usuario = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
};

export default function PerfilForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error' | ''>('');
  const [userOriginal, setUserOriginal] = useState<Usuario | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return router.push('/login');
    const user = JSON.parse(stored);
    setNombre(user.nombre || '');
    setApellido(user.apellido || '');
    setUserOriginal(user);
  }, [router]);

  const hayCambios =
    userOriginal &&
    (nombre !== userOriginal.nombre || apellido !== userOriginal.apellido);

  const handleActualizar = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setTipoMensaje('');

    if (!hayCambios || !userOriginal) return;

    const { id } = userOriginal;

    const { error } = await supabase
      .from('User')
      .update({ nombre, apellido })
      .eq('id', id);

    if (error) {
      setMensaje('Error al actualizar datos.');
      setTipoMensaje('error');
      return;
    }

    const actualizado = { ...userOriginal, nombre, apellido };
    localStorage.setItem('user', JSON.stringify(actualizado));
    setUserOriginal(actualizado);
    setMensaje('Perfil actualizado correctamente.');
    setTipoMensaje('exito');
  };

  return (
    <form onSubmit={handleActualizar} className="space-y-6 mb-12">
      {mensaje && (
        <div
          className={`text-sm font-medium p-3 rounded-md border ${
            tipoMensaje === 'error'
              ? 'bg-red-50 text-red-700 border-red-300'
              : 'bg-green-50 text-green-700 border-green-300'
          }`}
        >
          {mensaje}
        </div>
      )}

      <h1 className="text-3xl font-bold text-[#003ce5] mb-4">Cambiar nombre</h1>
      <p className="text-gray-700 mb-10 text-base">
        Modifica tu nombre o apellido. El correo no puede cambiarse.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-900 mb-1 block">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-900 mb-1 block">Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!hayCambios}
        className={`px-6 py-3 rounded-full shadow-md font-semibold transition duration-300 transform ${
          hayCambios
            ? 'text-white bg-[linear-gradient(to_right,_#003ce5,_#4959ff,_#003ce5)] hover:brightness-110 hover:scale-105'
            : 'bg-[#d0dbf5] text-[#7c8dbb] cursor-not-allowed'
        }`}
      >
        Guardar Cambios
      </button>
    </form>
  );
}
