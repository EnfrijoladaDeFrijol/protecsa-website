'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function RegistroForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState<'error' | 'exito' | ''>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 4) {
      setMensaje('La contraseña debe tener al menos 4 caracteres.');
      setTipoMensaje('error');
      return;
    }

    if (password !== confirmPassword) {
      setMensaje('Las contraseñas no coinciden.');
      setTipoMensaje('error');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, email, password }),
      });

      const contentType = res.headers.get('content-type');
      const data =
        contentType && contentType.includes('application/json')
          ? await res.json()
          : null;

      if (res.ok) {
        router.push(`/verifica/enviado?email=${encodeURIComponent(email)}`);
      } else {
        setMensaje(data?.error || 'Error al registrar');
        setTipoMensaje('error');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      setMensaje('Error inesperado');
      setTipoMensaje('error');
    }
  };

  return (
    <div className="bg-white/80 border border-white/30 p-10 rounded-3xl shadow-2xl max-w-md w-full space-y-6 text-center">
      <div className="flex justify-center">
        <Image
          src="/logo_P.png"
          alt="Logo PROTECSA"
          width={80}
          height={80}
          className="mb-2"
        />
      </div>

      <h2 className="text-3xl font-extrabold text-[#003ce5] tracking-wide">Regístrate</h2>
      <p className="text-sm text-gray-600 -mt-2">Únete a la comunidad PROTECSA</p>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre(s)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="px-4 py-3 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm"
        />
        <input
          type="text"
          placeholder="Apellido(s)"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="px-4 py-3 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm"
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 hover:text-gray-700"
            aria-label="Mostrar u ocultar contraseña"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 hover:text-gray-700"
            aria-label="Mostrar u ocultar confirmación"
          >
            {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>

        <button
          type="submit"
          className="relative bg-gradient-to-r from-[#E4B045] via-[#318ce7] to-[#003ce5] bg-[length:200%_200%] animate-gradient-cycle text-white font-semibold py-3 rounded-full shadow-md hover:scale-105 transition-all"
        >
          Crear cuenta
        </button>
      </form>

      {mensaje && (
        <p
          className={`text-sm text-center mt-4 p-3 rounded-md font-medium border w-full ${
            tipoMensaje === 'error'
              ? 'bg-red-50 text-red-700 border-red-200'
              : 'bg-green-50 text-green-700 border-green-200'
          }`}
        >
          {mensaje}
        </p>
      )}

      <div className="pt-3">
        <p className="text-sm text-gray-700">
          ¿Ya tienes cuenta?{' '}
          <Link
            href="/login"
            className="font-semibold border-[#003ce5] text-[#003ce5] px-1 py-2 rounded-full inline-block mt-2 hover:text-blue-500 transition"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-block mt-4 text-sm font-semibold border border-[#003ce5] text-[#003ce5] px-5 py-2 rounded-full hover:bg-[#003ce5] hover:text-white transition-all duration-300"
        >
          ⬅ Volver al inicio
        </Link>
      </div>
    </div>
  );
}
