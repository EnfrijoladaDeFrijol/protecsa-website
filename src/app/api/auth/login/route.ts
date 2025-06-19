import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Campos incompletos' }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error || !user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 });
    }

    // Veridicacióñ de correo verficado desde el correo
    if (!user.emailVerified) {
      return NextResponse.json({ error: 'El correo aún no ha sido verificado' }, { status: 403 });
    }

    const match = await bcrypt.compare(password, user.contrasena);
    if (!match) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
