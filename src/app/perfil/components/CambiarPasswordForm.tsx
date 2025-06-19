'use client';

import { useState, useEffect } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function CambiarPasswordForm() {
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState<'error' | 'exito' | ''>('');
  const [userId, setUserId] = useState('');
  const [verActual, setVerActual] = useState(false);
  const [verNueva, setVerNueva] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      setUserId(user.id);
    }
  }, []);

  const handleActualizarPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setTipoMensaje('');

    if (nuevaContrasena.length < 4) {
      setMensaje('La nueva contraseña debe tener al menos 4 caracteres.');
      setTipoMensaje('error');
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      setMensaje('Las contraseñas no coinciden.');
      setTipoMensaje('error');
      return;
    }

    if (nuevaContrasena === contrasenaActual) {
      setMensaje('La nueva contraseña no puede ser igual a la actual.');
      setTipoMensaje('error');
      return;
    }

    try {
      const res = await fetch('/api/perfil/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          contrasenaActual,
          nuevaContrasena,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || 'Error desconocido.');
        setTipoMensaje('error');
      } else {
        setMensaje(data.message);
        setTipoMensaje('exito');
        setContrasenaActual('');
        setNuevaContrasena('');
        setConfirmarContrasena('');
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      setMensaje('Error de conexión con el servidor.');
      setTipoMensaje('error');
    }
  };

  const camposValidos =
    contrasenaActual &&
    nuevaContrasena.length >= 4 &&
    nuevaContrasena === confirmarContrasena &&
    nuevaContrasena !== contrasenaActual;

  return (
    <form onSubmit={handleActualizarPassword} className="space-y-6 mb-12">
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

      <h2 className="text-3xl font-bold text-[#e4b045] mb-4">Cambiar contraseña</h2>
      <p className="text-gray-700 mb-10 text-base">
        Ingresa tu contraseña actual, y tu nueva contraseña la cual no debe ser la misma que la actual.
      </p>

      {/* Contraseña actual */}
      <div className="relative">
        <label className="text-sm font-medium text-gray-900 mb-1 block">
          Contraseña actual
        </label>
        <input
          type={verActual ? 'text' : 'password'}
          placeholder="Ingresa contraseña"
          value={contrasenaActual}
          onChange={(e) => setContrasenaActual(e.target.value)}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
          required
        />
        <div
          className="absolute top-9 right-4 cursor-pointer text-gray-500"
          onClick={() => setVerActual(!verActual)}
        >
          {verActual ? <HiEyeOff /> : <HiEye />}
        </div>
      </div>

      {/* Nueva y confirmar */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nueva */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-900 mb-1 block">
            Nueva contraseña
          </label>
          <input
            type={verNueva ? 'text' : 'password'}
            placeholder="Ingresa contraseña"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            required
          />
          <div
            className="absolute top-9 right-4 cursor-pointer text-gray-500"
            onClick={() => setVerNueva(!verNueva)}
          >
            {verNueva ? <HiEyeOff /> : <HiEye />}
          </div>
          <p className="text-xs text-gray-500 mt-1">Debe tener al menos 4 caracteres.</p>
        </div>

        {/* Confirmar */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-900 mb-1 block">
            Confirmar contraseña
          </label>
          <input
            type={verConfirmar ? 'text' : 'password'}
            placeholder="Repite contraseña"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            required
          />
          <div
            className="absolute top-9 right-4 cursor-pointer text-gray-500"
            onClick={() => setVerConfirmar(!verConfirmar)}
          >
            {verConfirmar ? <HiEyeOff /> : <HiEye />}
          </div>
        </div>
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={!camposValidos}
        className={`px-6 py-3 rounded-full shadow-md font-semibold transition duration-300 transform ${
          camposValidos
            ? 'text-white bg-[linear-gradient(to_right,_#e4b045,_#f0c14b,_#e4b045)] hover:brightness-110 hover:scale-105'
            : 'bg-[#f8e6b6] text-[#aa8f46] cursor-not-allowed'
        }`}
      >
        Guardar nueva contraseña
      </button>
    </form>
  );
}
