import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(`${APP_URL}/verifica/error`);
  }

  const { data: user, error } = await supabase
    .from('User')
    .select('*')
    .eq('verificationToken', token)
    .maybeSingle();

  if (error || !user || user.emailVerified) {
    return NextResponse.redirect(`${APP_URL}/verifica/error`);
  }

  const { error: updateError } = await supabase
    .from('User')
    .update({
      emailVerified: true,
      verificationToken: null, // opcional: invalidar token
    })
    .eq('id', user.id);

  if (updateError) {
    return NextResponse.redirect(`${APP_URL}/verifica/error`);
  }

  // Aquí decides a dónde mandar si fue exitoso
  return NextResponse.redirect(`${APP_URL}/login`);
}
