import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Asegúrate de que APP_URL esté configurado en Vercel (.env) como https://protecsaa.com
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    console.error('❌ Token no proporcionado');
    return NextResponse.redirect(`${APP_URL}/verifica/error`);
  }

  const { data: user, error } = await supabase
    .from('User')
    .select('*')
    .eq('verificationToken', token)
    .maybeSingle();

  if (error || !user || user.emailVerified) {
    console.error('❌ Error buscando usuario o ya verificado:', error);
    return NextResponse.redirect(`${APP_URL}/verifica/error`);
  }

  const { error: updateError } = await supabase
    .from('User')
    .update({
      emailVerified: true,
      verificationToken: null,
    })
    .eq('id', user.id);

  if (updateError) {
    console.error('❌ Error actualizando usuario:', updateError);
    return NextResponse.redirect(`${APP_URL}/verifica/error`);
  }

  console.log('✅ Usuario verificado con éxito');
  return NextResponse.redirect(`${APP_URL}/verifica/confirmado`);
}
