'use client';

import Image from 'next/image';
import React from 'react';

export default function CarritoContent() {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold text-blue-900">Carrito de compras</h2>
      <p className="text-gray-600 text-lg">Esta función estará disponible próximamente.</p>
      <div className="flex justify-center">
        <Image
          src="/animalitos/buldog.png"
          alt="Perrito dormido"
          width={700}
          height={700}
        />
      </div>
    </div>
  );
}
