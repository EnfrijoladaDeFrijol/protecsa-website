import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { id, contrasenaActual, nuevaContrasena } = await req.json();

  if (!id || !contrasenaActual || !nuevaContrasena) {
    return new Response(JSON.stringify({ error: 'Faltan datos.' }), { status: 400 });
  }

  try {
    const { data: user, error: fetchError } = await supabase
      .from('User')
      .select('contrasena')
      .eq('id', id)
      .single();

    if (fetchError || !user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado.' }), { status: 404 });
    }

    const coinciden = await bcrypt.compare(contrasenaActual, user.contrasena);
    if (!coinciden) {
      return new Response(JSON.stringify({ error: 'La contraseña actual no es correcta.' }), { status: 401 });
    }

    const esIgual = await bcrypt.compare(nuevaContrasena, user.contrasena);
    if (esIgual) {
      return new Response(JSON.stringify({ error: 'La nueva contraseña no puede ser igual a la actual.' }), { status: 400 });
    }

    const hashed = await bcrypt.hash(nuevaContrasena, 10);
    const { error: updateError } = await supabase
      .from('User')
      .update({ contrasena: hashed })
      .eq('id', id);

    if (updateError) {
      return new Response(JSON.stringify({ error: 'Error al actualizar contraseña.' }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Contraseña actualizada correctamente.' }), { status: 200 });
  } catch (err) {
    console.error('Error en el servidor:', err);
    return new Response(JSON.stringify({ error: 'Error del servidor.' }), { status: 500 });
  }
}
