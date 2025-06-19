import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    console.error('❌ Token no proporcionado');
    return NextResponse.redirect(`${new URL(req.url).origin}/verifica/error`);
  }

  console.log('🔐 Token recibido:', token);

  const { error } = await supabase
    .from('User')
    .update({ emailVerified: true, verificationToken: null })
    .eq('verificationToken', token);

  if (error) {
    console.error('❌ Error al verificar el correo:', error);
    return NextResponse.redirect(`${new URL(req.url).origin}/verifica/error`);
  }

  console.log('✅ Verificación completada con éxito');
  return NextResponse.redirect(`${new URL(req.url).origin}/verifica/confirmado`);

}
