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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      imagen_url: formulario.imagen_url, // asegúrate que esto esté actualizado
      temario_pdf: formulario.temario_pdf, // igual aquí
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
      setFormulario(updates); // ya incluye los valores nuevos
    }
  };


  const handleEliminar = async () => {
    if (!confirm('¿Eliminar este curso? Esta acción no se puede deshacer.')) return;
    const { error } = await supabase.from('cursos').delete().eq('id', curso.id);
    if (error) toast.error('Error al eliminar');
    else toast.success('Curso eliminado');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-start">
        <div className="w-full mr-4">
          <input
            name="titulo"
            type="text"
            value={formulario.titulo}
            onChange={handleChange}
            disabled={!editando}
            className="w-full text-2xl font-bold text-[#003ce5] bg-gray-100 rounded px-4 py-2"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
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
          <button
            onClick={() => setDesplegado(!desplegado)}
            className="px-4 py-2 rounded-full text-sm bg-black text-white hover:opacity-90"
          >
            {desplegado ? 'Ocultar detalles' : 'Ver detalles'}
          </button>
        </div>
      </div>

      {desplegado && (
        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-semibold text-[#003ce5]">Descripción del curso</h3>
            <textarea
              name="descripcion"
              rows={3}
              value={formulario.descripcion}
              onChange={handleChange}
              disabled={!editando}
              className="w-full border rounded px-4 py-2 text-black bg-gray-100 resize-none"
            />
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#003ce5]">Información general</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <input
                name="modalidad"
                type="text"
                value={formulario.modalidad}
                onChange={handleChange}
                disabled={!editando}
                className="w-full border rounded px-4 py-2 text-black bg-gray-100"
              />
              <input
                name="ubicacion"
                type="text"
                value={formulario.ubicacion}
                onChange={handleChange}
                disabled={!editando}
                className="w-full border rounded px-4 py-2 text-black bg-gray-100"
              />
              <input
                name="precio"
                type="number"
                value={formulario.precio}
                onChange={handleChange}
                disabled={!editando}
                className="w-full border rounded px-4 py-2 text-black bg-gray-100"
              />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#003ce5]">Fechas y horarios</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="fecha_inicio"
                type="date"
                value={formulario.fecha_inicio}
                onChange={handleChange}
                disabled={!editando}
                className="w-full border rounded px-4 py-2 text-black bg-gray-100"
              />
              <input
                name="fecha_fin"
                type="date"
                value={formulario.fecha_fin}
                onChange={handleChange}
                disabled={!editando}
                className="w-full border rounded px-4 py-2 text-black bg-gray-100"
              />
              <input
                name="hora_inicio"
                type="time"
                value={formulario.hora_inicio}
                onChange={handleChange}
                disabled={!editando}
                className="w-full border rounded px-4 py-2 text-black bg-gray-100"
              />
              <input
                name="hora_fin"
                type="time"
                value={formulario.hora_fin}
                onChange={handleChange}
                disabled={!editando}
                className="w-full border rounded px-4 py-2 text-black bg-gray-100"
              />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#003ce5]">Material y responsable</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="titular"
                type="text"
                value={formulario.titular}
                onChange={handleChange}
                disabled={!editando}
                className="w-full border rounded px-4 py-2 text-black bg-gray-100"
              />

              <EditarMaterial
                cursoId={curso.id}
                editando={editando}
                setImagenUrl={(url) => setFormulario((prev) => ({ ...prev, imagen_url: url }))}
                setTemarioPdf={(url) => setFormulario((prev) => ({ ...prev, temario_pdf: url }))}
              />
            </div>
          </section>

          {editando && (
            <div className="pt-4">
              <button
                onClick={handleGuardar}
                className="bg-[#003ce5] text-white px-6 py-2 rounded-full hover:bg-blue-800"
              >
                Guardar cambios
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
