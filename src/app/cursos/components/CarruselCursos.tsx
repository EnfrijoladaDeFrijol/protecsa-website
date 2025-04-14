'use client';

import CursoCard from './CursoCard';
import cursos from '@/app/cursos/cursos'; 

export default function CarruselCursos() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {cursos.map((curso, index) => (
        <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
          <CursoCard {...curso} />
        </div>
      ))}
    </div>
  );
}
