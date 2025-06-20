'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { anuncios } from './anunciosData';

export default function CarruselAnuncios() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="w-full bg-white py-5 sm:py-20 relative">
      <h3 className="text-4xl font-bold text-center text-[#1e40af] mb-12 relative after:block after:w-20 after:h-1 after:mx-auto after:mt-3 after:bg-[#eab308]">
        Novedades
      </h3>
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Flechas en pantallas grandes */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute z-20 -left-4 sm:-left-12 top-1/2 -translate-y-1/2 bg-white text-[#003ce5] shadow-md w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-[#003ce5] hover:text-white transition hidden sm:flex items-center justify-center text-2xl sm:text-3xl"
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute z-20 -right-4 sm:-right-12 top-1/2 -translate-y-1/2 bg-white text-[#003ce5] shadow-md w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-[#003ce5] hover:text-white transition hidden sm:flex items-center justify-center text-2xl sm:text-3xl"
          aria-label="Siguiente"
        >
          ›
        </button>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          pagination={{ el: '.custom-pagination', clickable: true }}
          navigation={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Navigation, Pagination]}
        >
          {anuncios.map((anuncio, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full h-[280px] sm:h-[550px] rounded-xl overflow-hidden border border-gray-200 shadow-md transition-all duration-500 ease-in-out hover:rotate-[0.5deg] hover:shadow-inner hover:shadow-blue-300"
              >
                <Image
                  src={anuncio.imagen}
                  alt={anuncio.titulo}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Botón PDF abajo derecha */}
                {anuncio.pdf && (
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                    <Link
                      href={anuncio.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver PDF del anuncio: ${anuncio.titulo}`}
                      className="px-6 py-3 bg-[#003ce5] text-white rounded-full font-semibold transition-all duration-300 ease-out transform hover:scale-110 hover:brightness-110 hover:shadow-xl text-sm sm:text-base"
                    >
                      Ver PDF
                    </Link>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Paginación afuera */}
        <div className="custom-pagination flex justify-center gap-2 mt-6"></div>

        {/* Estilos de bullets */}
        <style jsx global>{`
          .custom-pagination .swiper-pagination-bullet {
            background-color: #facc15;
            opacity: 0.7;
            width: 16px;
            height: 16px;
            margin: 0 4px !important;
          }
          .custom-pagination .swiper-pagination-bullet-active {
            background-color: #003ce5 !important;
            opacity: 1;
          }
        `}</style>
      </div>
    </section>
  );
}
