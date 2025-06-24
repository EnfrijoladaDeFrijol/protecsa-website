'use client';

import { useState } from 'react';

type Props = {
  userId?: string;
  nombre?: string;
};

export default function FormularioNuevo({ userId, nombre }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [temario, setTemario] = useState<File | null>(null);
  const instructorNombre = nombre || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('fecha_inicio', fechaInicio);
    formData.append('fecha_fin', fechaFin);
    formData.append('hora_inicio', horaInicio);
    formData.append('hora_fin', horaFin);
    formData.append('modalidad', modalidad);
    formData.append('ubicacion', ubicacion);
    formData.append('precio', precio);

    if (userId) {
      formData.append('creador_id', userId);
    }

    if (instructorNombre) {
      formData.append('titular', instructorNombre);
    }

    if (imagen) formData.append('imagen', imagen);
    if (temario) formData.append('temario', temario);

    try {
      const res = await fetch('/api/cursos', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.error || 'Error al crear curso');
        return;
      }

      alert('Curso creado correctamente.');
    } catch (err) {
      console.error(err);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-white/70 p-10 rounded-xl shadow-lg animate-fade-in space-y-12"
      encType="multipart/form-data"
    >
      <div>
        <h1 className="text-4xl font-bold text-[#003ce5] mb-1">Importante</h1>
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg mt-3">
          Por favor, sé <strong>cuidadoso</strong> y <strong>responsable</strong> al llenar este formulario. 
          Toda la información proporcionada será visible para el público. Asegúrate de que sea <strong>precisa, clara y correcta</strong>.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-[#003ce5] mb-4">Información general</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Nombre del curso"
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad</label>
            <select
              value={modalidad}
              onChange={(e) => setModalidad(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            >
              <option value="">Selecciona una opción</option>
              <option value="Presencial">Presencial</option>
              <option value="En línea">En línea</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
              placeholder="Breve descripción del curso"
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#003ce5] mb-4">Fechas y horarios</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Inicio</label>
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Fin</label>
            <input
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#003ce5] mb-4">Ubicación y precio</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <input
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              placeholder="Ej. J-101 o link de Zoom"
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input
              type="number"
              min={0}
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Ej. 600"
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#003ce5] mb-4">Material y responsable</h2>
        <div className="space-y-6">
          {/* Titular */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Titular</label>
            <input
              type="text"
              value={instructorNombre}
              readOnly
              className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-gray-700"
            />
          </div>

          {/* Archivos */}
          <div className="space-y-6">

            {/* Imagen del Curso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen del Curso <span className="text-xs text-gray-500">(Formatos: .jpg, .png)</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setImagen(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#003ce51a] file:text-[#003ce5] hover:file:bg-[#003ce533]"
                />
                {imagen && (
                  <button
                    type="button"
                    onClick={() => setImagen(null)}
                    className="text-blue-800 text-xs underline hover:text-red-800"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>

            {/* Temario PDF */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temario (PDF) <span className="text-xs text-gray-500">(Solo formato .pdf)</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setTemario(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e4b04533] file:text-[#b58900] hover:file:bg-[#e4b04555]"
                />
                {temario && (
                  <button
                    type="button"
                    onClick={() => setTemario(null)}
                    className="text-blue-900 text-xs underline hover:text-red-800"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>


      <div className="flex justify-end items-center pt-8">
        <button
          type="submit"
          className="bg-[#003ce5] text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-800 transition"
        >
          Crear Curso
        </button>
      </div>
    </form>
  );
}
