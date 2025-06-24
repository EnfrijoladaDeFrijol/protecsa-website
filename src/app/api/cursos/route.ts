import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(req: Request): Promise<Response> {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const formData = await req.formData();

  const titulo = formData.get('titulo') as string;
  const descripcion = formData.get('descripcion') as string;
  const fecha_inicio = formData.get('fecha_inicio') as string;
  const fecha_fin = formData.get('fecha_fin') as string;
  const hora_inicio = formData.get('hora_inicio') as string;
  const hora_fin = formData.get('hora_fin') as string;
  const modalidad = formData.get('modalidad') as string;
  const ubicacion = formData.get('ubicacion') as string;
  const precio = parseFloat(formData.get('precio') as string);
  const titular = formData.get('titular') as string | null;

  const imagenFile = formData.get('imagen') as File | null;
  const temarioFile = formData.get('temario') as File | null;

  if (!titulo || !descripcion || !fecha_inicio || !fecha_fin || !hora_inicio || !hora_fin || !modalidad || !ubicacion || isNaN(precio)) {
    return new Response(JSON.stringify({ error: 'Faltan campos obligatorios.' }), { status: 400 });
  }

  let imagen_url: string | null = null;
  let temario_pdf: string | null = null;

  if (imagenFile) {
    const { data, error } = await supabase.storage
      .from('cursos')
      .upload(`imagenes/${crypto.randomUUID()}_${imagenFile.name}`, imagenFile);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    imagen_url = supabase.storage.from('cursos').getPublicUrl(data.path).data.publicUrl;
  }

  if (temarioFile) {
    const { data, error } = await supabase.storage
      .from('cursos')
      .upload(`temarios/${crypto.randomUUID()}_${temarioFile.name}`, temarioFile);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    temario_pdf = supabase.storage.from('cursos').getPublicUrl(data.path).data.publicUrl;
  }

  const nuevoCurso = {
    titulo,
    descripcion,
    fecha_inicio,
    fecha_fin,
    hora_inicio,
    hora_fin,
    modalidad,
    ubicacion,
    precio,
    autorizado: false,
    activo: true,
    imagen_url,
    temario_pdf,
    titular,
  };

  const { data, error } = await supabase.from('cursos').insert([nuevoCurso]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'Curso creado exitosamente.', data }), { status: 201 });
}
