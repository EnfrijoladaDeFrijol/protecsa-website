'use client';

type Props = {
  nombre: string;
};

export default function EncabezadoNuevoCurso({ nombre }: Props) {
  return (
    <div className="relative w-full max-w-5xl mx-auto p-12 mb-10 text-center bg-gradient-to-br from-blue-50 to-yellow-50 rounded-4xl shadow-xl border border-blue-200">
      {/* Círculos decorativos difusos */}
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-blue-200 opacity-30 rounded-full blur-2xl animate-pulse" />

      {/* Encabezado */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-3 tracking-tight drop-shadow-md">
         Crear curso
      </h2>

      <p className="text-sm sm:text-lg text-gray-700 font-semibold">
        Titular: <span className="text-blue-700 font-bold">{nombre}</span>
      </p>
    </div>
  );
}
