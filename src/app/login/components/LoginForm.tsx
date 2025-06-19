'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Error al iniciar sesión');
        return;
      }

      // ✅ Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('✅ Usuario guardado en localStorage:', data.user);

      router.push('/');
    } catch (error) {
      setErrorMsg('Error del servidor. Intenta más tarde.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="bg-white/80 border border-white/30 p-10 rounded-3xl shadow-2xl max-w-md w-full space-y-6 transition-all duration-500 ease-in-out text-center">
      {/* Logo */}
      <div className="flex justify-center">
        <Image
          src="/logo_P.png"
          alt="Logo PROTECSA"
          width={80}
          height={80}
          className="mb-2"
        />
      </div>

      <h2 className="text-3xl font-extrabold text-[#003ce5] tracking-wide drop-shadow-sm">
        Iniciar Sesión
      </h2>

      {/* Error */}
      {errorMsg && (
        <div className="text-sm text-red-600 bg-red-100 px-4 py-2 rounded-md shadow-sm">
          {errorMsg}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm hover:shadow-md transition"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-3 rounded-xl bg-[#f0f4ff] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4959ff] border border-[#003ce5]/30 shadow-sm hover:shadow-md transition"
          required
        />

        <button
          type="submit"
          className="relative bg-gradient-to-r from-[#4959ff] via-[#4a9ae9] to-[#318ce7] bg-[length:200%_200%] animate-gradient-cycle text-white font-semibold py-3 rounded-full shadow-md hover:scale-105 transition-all"
        >
          Entrar
        </button>
      </form>

      {/* Registro */}
      <p className="text-sm text-gray-800">
        ¿Aún no tienes cuenta?{' '}
        <Link
          href="/registro"
          className="text-[#E4B045] font-semibold hover:text-[#c59428] transition"
        >
          Regístrate aquí
        </Link>
      </p>

      {/* Volver al inicio */}
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
