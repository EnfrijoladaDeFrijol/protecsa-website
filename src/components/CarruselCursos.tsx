'use client';

import { cursos } from '@/app/cursos/courseData';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { useRef } from 'react';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';

export default function CarruselCursos() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="py-20 px-6 bg-white relative">
      <h3 className="text-4xl font-bold text-center text-[#1e40af] mb-12 relative after:block after:w-20 after:h-1 after:mx-auto after:mt-3 after:bg-[#eab308]">
        Nuestros Cursos
      </h3>

      <div className="relative max-w-6xl mx-auto">
        {/* Flechas externas */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-14 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md w-10 h-10 rounded-full text-[#003ce5] hover:bg-[#003ce5] hover:text-white transition hidden lg:flex items-center justify-center text-3xl"
          aria-label="Anterior"
        >
          ‹
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md w-10 h-10 rounded-full text-[#003ce5] hover:bg-[#003ce5] hover:text-white transition hidden lg:flex items-center justify-center text-3xl"
          aria-label="Siguiente"
        >
          ›
        </button>

        {/* Carrusel */}
        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            0: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
        >
          {cursos.map((curso, index) => (
            <SwiperSlide key={index}>
              <div className="h-[460px] flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 transition hover:shadow-2xl">
                <div className="relative w-full h-56">
                  <Image
                    src={curso.imagen}
                    alt={curso.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-[#003ce5] mb-2">
                      {curso.titulo}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {curso.descripcion}
                    </p>
                  </div>
                  <Link
                    href={`/cursos/${curso.slug}`}
                    className="mt-4 inline-block px-5 py-2 bg-[#003ce5] text-white rounded-full hover:bg-[#4959ff] transition font-medium text-sm w-fit"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
