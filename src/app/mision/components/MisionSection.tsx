'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const puntosMision = [
  {
    titulo: "Desarrollo de habilidades técnicas",
    descripcion: "Formamos a los estudiantes en herramientas y conocimientos técnicos útiles para su entorno académico y profesional.",
    imagen: "/mision/hardskill.jpg",
  },
  {
    titulo: "Desarrollo de soft skills",
    descripcion: "Impulsamos el crecimiento personal a través de habilidades como la empatía, la gestión del tiempo y la adaptabilidad.",
    imagen: "/mision/softskills.jpg",
  },
  {
    titulo: "Trabajo en equipo",
    descripcion: "Fomentamos la colaboración activa en equipos, preparándolos para dinámicas grupales en entornos reales.",
    imagen: "/mision/equipo.jpg",
  },
  {
    titulo: "Comunicación",
    descripcion: "Promovemos la comunicación efectiva, tanto oral como escrita, como base para el liderazgo y el trabajo colaborativo.",
    imagen: "/mision/comunicacion.jpg",
  },
  {
    titulo: "Impartición de clases y capacitación",
    descripcion: "Capacitamos a estudiantes para compartir sus conocimientos mediante cursos y talleres de calidad.",
    imagen: "/mision/clases.jpg",
  },
  {
    titulo: "Desarrollo de proyectos",
    descripcion: "Creamos proyectos colaborativos donde los estudiantes aplican sus conocimientos para resolver retos reales.",
    imagen: "/mision/proyectos.jpg",
  },
];

export default function MisionCards() {
  return (
    <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto">
      {/* Texto introductorio */}
      <h2 className="text-4xl font-bold text-center text-[#003ce5] mb-8">Nuestra Misión</h2>
      <p className="text-center max-w-3xl mx-auto text-lg text-gray-800 mb-16">
        En <strong>PROTECSA</strong>, nuestra misión es formar estudiantes capaces de desenvolverse en el ámbito académico y profesional a través del desarrollo de habilidades técnicas, soft skills, trabajo en equipo y comunicación efectiva. Lo hacemos mediante la impartición de cursos, capacitaciones y el desarrollo de proyectos colaborativos e innovadores.
      </p>

      {/* Tarjetas */}
      <div className="space-y-16">
        {puntosMision.map((punto, index) => (
          <motion.div
            key={punto.titulo}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            } items-center gap-10`}
          >
            <div className="w-full md:w-1/2">
              <Image
                src={punto.imagen}
                alt={punto.titulo}
                width={500}
                height={300}
                className="rounded-xl shadow-lg w-full h-auto object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-[#003ce5] mb-2">{punto.titulo}</h3>
              <p className="text-gray-700">{punto.descripcion}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
