'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CursoProps {
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: string;
}

export default function CursoCard({ slug, titulo, descripcion, imagen }: CursoProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300">
      <Image
        src={imagen}
        alt={titulo}
        width={400}
        height={176}
        className="w-full h-44 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#003ce5]">{titulo}</h3>
        <p className="mt-2 text-gray-600">{descripcion}</p>

        {/* Botón que lleva a la página del curso */}
        <Link
          href={`/cursos/${slug}`}
          className="mt-4 inline-block px-4 py-2 bg-[#003ce5] text-white rounded-full hover:bg-[#4959ff] transition"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}
