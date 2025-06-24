'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AccesoDenegadoPage() {
  const router = useRouter();

  // Redirige después de 6 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 6000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#ff4d4d] to-[#ffcccc] text-center px-4">
      <div className="max-w-lg p-8 bg-white shadow-2xl rounded-3xl border-4 border-red-700 animate-pulse">
        <h1 className="text-5xl font-black text-red-800 mb-6 tracking-wider">
          🚫 NO DEBERÍAS ESTAR AQUÍ 🚫
        </h1>
        <p className="text-lg text-gray-900 mb-4">
          Sabemos que intentaste algo indebido... <br />
          <span className="text-red-600 font-semibold">
            Tu rol no tiene acceso.
          </span>
        </p>
        <Image
          src="/animalitos/puppy_soon.png"
          alt="Perrito decepcionado"
          width={300}
          height={300}
          className="mx-auto mb-6 rounded-xl border-2 border-red-400 shadow-lg"
        />
        <p className="text-sm italic text-gray-600">
          El perrito está decepcionado... y nosotros también.
        </p>
      </div>
    </main>
  );
}
