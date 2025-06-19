'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PerfilForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return router.push('/login');
    const user = JSON.parse(stored);
    setNombre(user.nombre || '');
    setApellido(user.apellido || '');
    setEmail(user.email || '');
  }, [router]);

  const handleActualizar = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    const stored = localStorage.getItem('user');
    if (!stored) return;
    const user = JSON.parse(stored);
    const { id } = user;

    const { error } = await supabase
      .from('User')
      .update({ nombre, apellido })
      .eq('id', id);

    if (error) {
      setMensaje('❌ Error al actualizar datos.');
      return;
    }

    const actualizado = { ...user, nombre, apellido };
    localStorage.setItem('user', JSON.stringify(actualizado));
    setMensaje('✅ Perfil actualizado correctamente.');
  };

  return (
    <form onSubmit={handleActualizar} className="space-y-6 mb-12">
      {mensaje && (
        <div className="text-sm font-medium p-3 rounded-md bg-blue-50 text-blue-700 border border-blue-300">
          {mensaje}
        </div>
      )}
      <h1 className="text-4xl font-bold text-[#003ce5] mb-4">Editar Perfil</h1>
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

      <div>
        <label className="text-sm font-medium text-gray-900 mb-1 block">Correo electrónico</label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full px-4 py-3 border bg-gray-100 border-gray-300 rounded-lg text-gray-500"
        />
      </div>

      <button
        type="submit"
        className="bg-[#003ce5] hover:bg-[#4959ff] text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
      >
        Guardar Cambios
      </button>
    </form>
  );
}
