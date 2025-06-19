'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function RegistroForm() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMensaje('❌ Las contraseñas no coinciden.');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, email, password }),
      });

      const contentType = res.headers.get('content-type');
      const data =
        contentType && contentType.includes('application/json')
          ? await res.json()
          : null;

      if (res.ok) {
        setMensaje('✅ Código de verificación enviado a tu correo.');
        setNombre('');
        setApellido('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setMensaje(`❌ ${data?.error || 'Error al registrar'}`);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      setMensaje('❌ Error inesperado');
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
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-3 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-4 py-3 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm"
        />

        <button
          type="submit"
          className="relative bg-gradient-to-r from-[#E4B045] via-[#318ce7] to-[#003ce5] bg-[length:200%_200%] animate-gradient-cycle text-white font-semibold py-3 rounded-full shadow-md hover:scale-105 transition-all"
        >
          Crear cuenta
        </button>
      </form>

      {mensaje && <p className="text-sm text-center text-[#003ce5]">{mensaje}</p>}

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
