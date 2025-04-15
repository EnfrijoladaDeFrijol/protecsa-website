'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

import { cursos } from '../courseData';
import type { Curso } from '../courseData';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CoursePage() {
  const { slug } = useParams();
  const [curso, setCurso] = useState<Curso | null>(null);

  useEffect(() => {
    const encontrado = cursos.find((c) => c.slug === slug);
    setCurso(encontrado || null);
  }, [slug]);

  if (!curso) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center text-lg">Cargando curso...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-6 space-y-12 text-black">
        <h1 className="text-4xl font-extrabold text-center text-blue-800">{curso.titulo}</h1>

        <Image
          src={curso.imagen}
          alt={curso.titulo}
          width={1000}
          height={500}
          className="rounded-lg shadow-md mx-auto"
        />

        <p className="text-lg text-center text-black-700">{curso.descripcion}</p>

        <div className="flex flex-col md:flex-row justify-around items-center text-lg gap-6 text-black">
          <span><strong>Duración:</strong> {curso.duracion}</span>
          <span><strong>Modalidad:</strong> {curso.modalidad}</span>
          <span className="flex items-center gap-1">
            <strong>Calificación:</strong>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-yellow-400 ${i < Math.round(curso.calificacion) ? 'fill-current' : 'opacity-30'}`}
              />
            ))}
          </span>
          <span><strong>Precio:</strong> ${curso.precio} MXN</span>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Temario</h2>
          {curso.temario.map((modulo, idx) => (
            <details key={idx} className="mb-3 bg-blue-50 p-4 rounded shadow">
              <summary className="cursor-pointer font-semibold text-blue-800">{modulo.modulo}</summary>
              <ul className="list-disc ml-6 mt-2 text-gray-700">
                {modulo.temas.map((tema, i) => (
                  <li key={i}>{tema}</li>
                ))}
              </ul>
            </details>
          ))}
          <a
            href={`/temarios/${curso.slug}.pdf`}
            download
            className="inline-block mt-4 text-blue-700 font-semibold underline hover:text-blue-900"
          >
            Descargar temario en PDF
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Opiniones</h2>
          {curso.opiniones.map((op, idx) => (
            <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow mb-3">
              <p className="font-bold">{op.nombre}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-400 ${i < op.estrellas ? 'fill-current' : 'opacity-30'}`}
                  />
                ))}
              </div>
              <p className="text-gray-700">{op.comentario}</p>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </>
  );
}
