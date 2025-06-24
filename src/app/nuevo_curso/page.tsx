'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FormularioNuevo from './components/FormularioNuevo';
import EncabezadoNuevoCurso from './components/EncabezadoNuevoCurso';

export default function NuevoCursoPage() {
  const [nombreInstructor, setNombreInstructor] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [rol, setRol] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      const rolUsuario = parsed.rol || '';

      setUserId(parsed.id || null);
      setRol(rolUsuario);

      const primerNombre = (parsed.nombre || '').split(' ')[0];
      const primerApellido = (parsed.apellido || '').split(' ')[0];
      setNombreInstructor(`${primerNombre} ${primerApellido}`.trim());

      // Rstringimos acceso
      if (rolUsuario !== 'Administrador' && rolUsuario !== 'Becario') {
        router.replace('/acceso_denegado'); // o '/' si se prefiere
      }
    } else {
      // No hay sesión
      router.replace('/acceso_denegado');
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen w-full bg-gradient-to-br from-[#f0f4ff] to-[#e4f0ff] py-20 px-6">
        {/* Círculos decorativos */}
        <div className="absolute top-60 left-10 w-72 h-72 bg-[#003ce5] opacity-20 rounded-full mix-blend-multiply filter blur-md animate-blob" />
        <div className="absolute top-40 right-40 w-72 h-72 bg-[#e4b045] opacity-20 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-[#4a9ae9] opacity-20 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-4000" />

        <EncabezadoNuevoCurso nombre={nombreInstructor || '...'} />
        {userId && (rol === 'Administrador' || rol === 'Becario') && (
          <FormularioNuevo userId={userId} nombre={nombreInstructor} />
        )}
      </main>
    </>
  );
}
