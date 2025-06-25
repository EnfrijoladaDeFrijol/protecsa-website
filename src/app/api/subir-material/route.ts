import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin'; // usa esta línea

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const cursoId = formData.get('cursoId') as string | null;
    const tipo = formData.get('tipo') as string | null;

    if (!file || !cursoId || !tipo) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const extension = file.name.split('.').pop();
    const filePath =
      tipo === 'imagen'
        ? `imagenes/${cursoId}.${extension}`
        : `temarios/${cursoId}.${extension}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabaseAdmin.storage
      .from('cursos')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error('❌ Error al subir archivo:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabaseAdmin.storage.from('cursos').getPublicUrl(filePath);

    return NextResponse.json({
      mensaje: 'Subido correctamente',
      url: data.publicUrl,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ Error general:', err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.error('❌ Error inesperado:', err);
    return NextResponse.json({ error: 'Error desconocido' }, { status: 500 });
  }
}
