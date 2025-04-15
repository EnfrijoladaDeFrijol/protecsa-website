'use client';

import { cursos } from '../courseData';
import CursoCard from './CursoCard';

export default function CarruselCursos() {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {cursos.map((curso) => (
        <CursoCard
          key={curso.slug}
          slug={curso.slug}
          titulo={curso.titulo}
          descripcion={curso.descripcion}
          imagen={curso.imagen}
        />
      ))}
    </div>
  );
}
