'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

type Props = {
  onClose: () => void;
  onSelect: (file: string) => void;
};

// Categorías con ruta y archivos correspondientes
const AVATAR_CATEGORIES: Record<string, { path: string; files: string[] }> = {
  Default: {
    path: '',
    files: ['default.png'],
  },
  Protecsa: {
    path: 'protecsa',
    files: ['1.png', '2.png'],
  },
  Animales: {
    path: 'animales',
    files: ['2.png','3.png','4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png'],
  },
};

export default function AvatarSelectorPortal({ onClose, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Cierra si se hace clic fuera del contenedor
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-[2px] bg-white/30 overflow-y-auto">
      <div
        ref={containerRef}
        className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-lg flex flex-col items-center space-y-4 max-h-[80vh] sm:max-h-fit overflow-y-auto"
        >
        <h3 className="text-xl font-semibold text-gray-800">Selecciona tu avatar</h3>

        {/* Renderizar por categoría */}
        {Object.entries(AVATAR_CATEGORIES).map(([categoria, { path, files }]) => (
          <div key={categoria} className="w-full">
            <h4 className="text-md font-semibold text-gray-600 mb-2">{categoria}</h4>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {files.map((file) => {
                const fullPath = path ? `${path}/${file}` : file;
                return (
                  <button
                    key={`${categoria}-${file}`}
                    onClick={() => onSelect(fullPath)}
                    className="rounded-full ring-2 ring-transparent hover:ring-blue-500 transition"
                  >
                    <Image
                      src={`/avatar/${fullPath}`}
                      alt={`${categoria} ${file}`}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Botón de cancelar */}
        <button
          onClick={onClose}
          className="mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition shadow"
        >
          Cancelar
        </button>
      </div>
    </div>,
    document.body
  );
}
