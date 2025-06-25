'use client';

import { useState, ChangeEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Props {
  cursoId: string;
  editando: boolean;
  setImagenUrl: (url: string) => void;
  setTemarioPdf: (url: string) => void;
}

export default function EditarMaterial({
  cursoId,
  editando,
  setImagenUrl,
  setTemarioPdf,
}: Props) {
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [temarioFile, setTemarioFile] = useState<File | null>(null);
  const [imagenActual, setImagenActual] = useState<string | null>(null);
  const [pdfActual, setPdfActual] = useState<string | null>(null);

  const handleImagenSeleccionada = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImagenFile(file);
  };

  const handleTemarioSeleccionado = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setTemarioFile(file);
  };

  const subirImagen = async () => {
    if (!imagenFile) {
      toast.error('📸 Selecciona una imagen primero.');
      return;
    }

    const formData = new FormData();
    formData.append('file', imagenFile);
    formData.append('cursoId', cursoId);
    formData.append('tipo', 'imagen');

    const res = await fetch('/api/subir-material', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (!res.ok) {
      toast.error('❌ Error al subir la imagen.');
      return;
    }

    const url = result.url;
    setImagenUrl(url);
    setImagenActual(url);

    const { error } = await supabase
      .from('cursos')
      .update({ imagen_url: url })
      .eq('id', cursoId);

    if (error) {
      toast.error('⚠️ Imagen cargada, pero no se pudo actualizar la base de datos.');
      return;
    }

    toast.success('✅ Imagen actualizada con éxito.');
    setImagenFile(null);
  };

  const subirTemario = async () => {
    if (!temarioFile) {
      toast.error('📄 Selecciona un archivo PDF primero.');
      return;
    }

    const formData = new FormData();
    formData.append('file', temarioFile);
    formData.append('cursoId', cursoId);
    formData.append('tipo', 'temario');

    const res = await fetch('/api/subir-material', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (!res.ok) {
      toast.error('❌ Error al subir el PDF.');
      return;
    }

    const url = result.url;
    setTemarioPdf(url);
    setPdfActual(url);

    const { error } = await supabase
      .from('cursos')
      .update({ temario_pdf: url })
      .eq('id', cursoId);

    if (error) {
      toast.error('⚠️ PDF subido, pero no se pudo guardar en la base de datos.');
      return;
    }

    toast.success('📘 Temario actualizado correctamente.');
    setTemarioFile(null);
  };

  useState(() => {
    const cargarDatosActuales = async () => {
      const { data, error } = await supabase
        .from('cursos')
        .select('imagen_url, temario_pdf')
        .eq('id', cursoId)
        .single();

      if (!error && data) {
        setImagenActual(data.imagen_url);
        setPdfActual(data.temario_pdf);
      }
    };
    cargarDatosActuales();
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Imagen */}
        <div className="flex flex-col gap-4 w-full">
          {imagenActual && (
            <div>
              <label className="text-sm font-semibold text-gray-700">Imagen actual:</label>
              <img
                src={imagenActual}
                alt="Imagen del curso"
                className="w-full rounded shadow"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Actualizar imagen (Puede tardar unos minutos en actualizar)</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              disabled={!editando}
              onChange={handleImagenSeleccionada}
              className="w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                         file:bg-[#003ce51a] file:text-[#003ce5] hover:file:bg-[#003ce533]"
            />
            {imagenFile && (
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 truncate max-w-[60%]">{imagenFile.name}</p>
                <button
                  onClick={subirImagen}
                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700"
                >
                  Confirmar subida
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PDF */}
        <div className="flex flex-col gap-4 w-full">
          {pdfActual && (
            <div>
              <label className="text-sm font-semibold text-gray-700">Temario actual (PDF):</label>
              <iframe
                src={pdfActual}
                className="w-full h-64 border border-gray-300 rounded"
                title="PDF del temario"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Actualizar temario (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              disabled={!editando}
              onChange={handleTemarioSeleccionado}
              className="w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                         file:bg-[#e4b04533] file:text-[#b58900] hover:file:bg-[#e4b04555]"
            />
            {temarioFile && (
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 truncate max-w-[60%]">{temarioFile.name}</p>
                <button
                  onClick={subirTemario}
                  className="text-xs bg-yellow-600 text-white px-3 py-1 rounded-full hover:bg-yellow-700"
                >
                  Confirmar subida
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}