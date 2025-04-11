'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function CarruselCursos() {
  return (
    <section className="py-16 px-4 bg-white">
      <h3 className="text-3xl font-bold text-center text-blue-800 mb-8">Nuestros Cursos</h3>
      <div className="max-w-5xl mx-auto">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <SwiperSlide key={i}>
              <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                <h4 className="text-xl font-semibold text-blue-700 mb-2">Curso #{i}</h4>
                <p className="text-gray-600 mb-4">
                  Descripción breve del curso. Aprende herramientas útiles y mejora tus habilidades.
                </p>
                <a href="/cursos" className="text-blue-600 hover:underline font-medium">Más información →</a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
