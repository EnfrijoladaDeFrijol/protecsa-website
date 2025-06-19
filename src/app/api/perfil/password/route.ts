import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { id, nuevaContrasena } = await req.json();

  if (!id || !nuevaContrasena) {
    return new Response(JSON.stringify({ error: 'Faltan datos.' }), { status: 400 });
  }

  try {
    const hashed = await bcrypt.hash(nuevaContrasena, 10);

    const { error } = await supabase
      .from('User')
      .update({ contrasena: hashed })
      .eq('id', id);

    if (error) {
      return new Response(JSON.stringify({ error: 'Error al actualizar contraseña.' }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Contraseña actualizada correctamente.' }), { status: 200 });
  }catch (err) {
    console.error('Error al cambiar contraseña:', err);
    return new Response(JSON.stringify({ error: 'Error del servidor.' }), { status: 500 });
  }
}
