'use client';
import { useEffect, useState } from 'react';

const fondos = ['/FC1.jpg', '/UNAM1.jpg', '/fC2.jpg', '/UNAM2.jpg'];

export default function SobreNosotros() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % fondos.length);
    }, 8000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="relative h-[500px] overflow-hidden flex items-center justify-center">
      {/* Imagen con animación crossfade */}
      {fondos.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === i ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}

      {/* Blur encima de TODA la imagen */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      {/* Contenido centrado */}
      <div className="relative z-10 p-6 rounded-xl shadow-lg max-w-2xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6 drop-shadow-md">
          ¿Quiénes somos?
        </h2>
        <p className="text-xl leading-relaxed drop-shadow-md">
          PROTECSA es una asociación estudiantil de la Facultad de Ciencias de la UNAM. Nos dedicamos a ofrecer cursos
          intersemestrales de alta calidad a estudiantes y público general. Nuestro objetivo es generar aprendizaje
          colaborativo y experiencias útiles para el desarrollo académico y profesional.
        </p>
      </div>
    </section>
  );
}
