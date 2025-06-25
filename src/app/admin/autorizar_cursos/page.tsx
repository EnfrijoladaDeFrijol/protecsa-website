'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import CursoItem, { Curso } from './components/CursoItem';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

export default function AutorizarCursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      if (user.rol !== 'Administrador') {
        router.replace('/acceso_denegado');
      } else {
        fetchCursos();
      }
    } else {
      router.replace('/acceso_denegado');
    }
  }, [router]);

  const fetchCursos = async () => {
    const { data, error } = await supabase
      .from('cursos')
      .select('*')
      .eq('autorizado', false)
      .order('fecha_inicio', { ascending: true });

    if (error) toast.error('Error al cargar cursos');
    else setCursos(data as Curso[]);
  };

  const autorizarCurso = async (id: string) => {
    const { error } = await supabase
      .from('cursos')
      .update({ autorizado: true })
      .eq('id', id);

    if (error) toast.error('No se pudo autorizar');
    else {
      toast.success('Curso autorizado');
      fetchCursos();
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f7faff] px-6 py-10">
        <h1 className="text-3xl font-bold text-[#003ce5] mb-8">Cursos pendientes</h1>
        <div className="space-y-6">
          {cursos.length === 0 ? (
            <p className="text-gray-600">No hay cursos pendientes.</p>
          ) : (
            cursos.map((curso) => (
              <CursoItem key={curso.id} curso={curso} onAutorizar={() => autorizarCurso(curso.id)} />
            ))
          )}
        </div>
      </main>
    </>
  );
}
