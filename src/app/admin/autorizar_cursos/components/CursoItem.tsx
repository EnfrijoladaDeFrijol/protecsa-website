'use client';

import { useState, ChangeEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import EditarMaterial from './EditarMaterial';

export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  modalidad: string;
  ubicacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  hora_inicio: string;
  hora_fin: string;
  precio: number;
  temario_pdf: string | null;
  imagen_url: string | null;
  titular: string;
  autorizado: boolean;
}

interface Props {
  curso: Curso;
  onAutorizar: () => void;
}

export default function CursoItem({ curso, onAutorizar }: Props) {
  const [editando, setEditando] = useState(false);
  const [desplegado, setDesplegado] = useState(false);
  const [formulario, setFormulario] = useState<Curso>(curso);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: name === 'precio' ? Number(value) : value,
    }));
  };

  const handleGuardar = async () => {
    const updates = {
      ...formulario,
      imagen_url: formulario.imagen_url,
      temario_pdf: formulario.temario_pdf,
    };

    const { error } = await supabase
      .from('cursos')
      .update(updates)
      .eq('id', curso.id);

    if (error) {
      toast.error('Error al actualizar');
    } else {
      toast.success('Curso actualizado correctamente ✅');
      setEditando(false);
      setFormulario(updates);
    }
  };

  const handleEliminar = async () => {
    if (!confirm('¿Eliminar este curso? Esta acción no se puede deshacer.')) return;
    const { error } = await supabase.from('cursos').delete().eq('id', curso.id);
    if (error) toast.error('Error al eliminar');
    else toast.success('Curso eliminado');
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md space-y-4 transition-all duration-300 ${editando ? 'ring-2 ring-yellow-400' : ''}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full">
          <input
            name="titulo"
            type="text"
            value={formulario.titulo}
            onChange={handleChange}
            disabled={!editando}
            className={`w-full text-2xl font-bold rounded px-4 py-2 transition ${editando ? 'bg-yellow-100 border border-yellow-400 text-[#003ce5]' : 'bg-gray-100 text-[#003ce5]'}`}
          />
        </div>

        <button
          onClick={() => setDesplegado(!desplegado)}
          className="px-4 py-2 rounded-full text-sm bg-black text-white hover:opacity-90"
        >
          {desplegado ? 'Ocultar detalles' : 'Ver detalles'}
        </button>
      </div>

      {desplegado && (
        <div className="space-y-6">
          <section className="bg-[#f0f4ff] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#003ce5]">Descripción del curso</h3>
            <textarea
              name="descripcion"
              rows={3}
              value={formulario.descripcion}
              onChange={handleChange}
              disabled={!editando}
              className={`w-full border rounded px-4 py-2 resize-none transition text-black ${editando ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100'}`}
            />
          </section>

          <section className="bg-[#f0f4ff] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#003ce5]">Información general</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <select
                name="modalidad"
                value={formulario.modalidad}
                onChange={handleChange}
                disabled={!editando}
                className={`w-full border rounded px-4 py-2 transition text-black ${editando ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100'}`}
              >
                <option value="">Selecciona una opción</option>
                <option value="Presencial">Presencial</option>
                <option value="En línea">En línea</option>
                <option value="Híbrido">Híbrido</option>
              </select>

              <input
                name="ubicacion"
                type="text"
                value={formulario.ubicacion}
                onChange={handleChange}
                disabled={!editando}
                className={`w-full border rounded px-4 py-2 transition text-black ${editando ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100'}`}
              />
              <input
                name="precio"
                type="number"
                value={formulario.precio}
                onChange={handleChange}
                disabled={!editando}
                className={`w-full border rounded px-4 py-2 transition text-black ${editando ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100'}`}
              />
            </div>
          </section>

          <section className="bg-[#f0f4ff] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#003ce5]">Fechas y horarios</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="fecha_inicio"
                type="date"
                value={formulario.fecha_inicio}
                onChange={handleChange}
                disabled={!editando}
                className={`w-full border rounded px-4 py-2 transition text-black ${editando ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100'}`}
              />
              <input
                name="fecha_fin"
                type="date"
                value={formulario.fecha_fin}
                onChange={handleChange}
                disabled={!editando}
                className={`w-full border rounded px-4 py-2 transition text-black ${editando ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100'}`}
              />
              <input
                name="hora_inicio"
                type="time"
                value={formulario.hora_inicio}
                onChange={handleChange}
                disabled={!editando}
                className={`w-full border rounded px-4 py-2 transition text-black ${editando ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100'}`}
              />
              <input
                name="hora_fin"
                type="time"
                value={formulario.hora_fin}
                onChange={handleChange}
                disabled={!editando}
                className={`w-full border rounded px-4 py-2 transition text-black ${editando ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100'}`}
              />
            </div>
          </section>

          <section className="bg-[#f0f4ff] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#003ce5] mb-4">Material y responsable</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-800 mb-1">Nombre del Titular</label>
              <input
                name="titular"
                type="text"
                value={formulario.titular}
                onChange={handleChange}
                disabled={!editando}
                className={`w-full border rounded px-4 py-2 transition text-black ${editando ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100'}`}
              />
            </div>

            <div className="w-full">
              <div className="w-full mt-6">
                <EditarMaterial
                  cursoId={curso.id}
                  editando={editando}
                  setImagenUrl={(url) => setFormulario((prev) => ({ ...prev, imagen_url: url }))}
                  setTemarioPdf={(url) => setFormulario((prev) => ({ ...prev, temario_pdf: url }))}
                />
              </div>

              {editando && (
                <div className="pt-6 flex justify-end">
                  <button
                    onClick={handleGuardar}
                    className="bg-[#003ce5] text-white px-6 py-2 rounded-full hover:bg-blue-800"
                  >
                    Guardar cambios
                  </button>
                </div>
              )}
            </div>
          </section>

          <div className="flex flex-wrap justify-end gap-2 pt-6">
            {desplegado && (
              <>
                <button
                  onClick={() => setEditando(!editando)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-yellow-500 text-sm"
                >
                  {editando ? 'Cancelar' : 'Editar'}
                </button>
                {!curso.autorizado && (
                  <button
                    onClick={onAutorizar}
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 text-sm"
                  >
                    Autorizar
                  </button>
                )}
                <button
                  onClick={handleEliminar}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 text-sm"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
