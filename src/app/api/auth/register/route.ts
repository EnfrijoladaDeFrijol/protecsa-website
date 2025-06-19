import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { resend } from '@/lib/email';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, apellido, email, password } = body;

    console.log("📥 Datos recibidos:", { nombre, apellido, email });

    if (!nombre || !apellido || !email || !password) {
      return NextResponse.json({ error: 'Por favor, completa todos los campos.' }, { status: 400 });
    }

    const { data: existingUser, error: lookupError } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (lookupError) {
      console.error('❌ Error al buscar usuario existente:', lookupError);
      return NextResponse.json({ error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este correo ya está registrado. Intenta iniciar sesión o usa otro.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = uuidv4();

    const { error: insertError } = await supabase.from('User').insert({
      nombre,
      apellido,
      email,
      contrasena: hashedPassword,
      emailVerified: false,
      verificationToken: token,
    });

    if (insertError) {
      console.error('❌ Error al crear usuario:', insertError);
      return NextResponse.json({ error: 'No se pudo crear el usuario.' }, { status: 500 });
    }

    const verifyLink = `${APP_URL}/verifica?token=${token}`;
    console.log("🔗 Link de verificación:", verifyLink);

    const response = await resend.emails.send({
      from: '"Verificación PROTECSA" <verificacion@protecsaa.com>',
      to: email,
      subject: 'Confirma tu cuenta en PROTECSA',
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f6fb; padding: 40px;">
          <div style="max-width: 520px; margin: auto; background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); padding: 30px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://protecsaa.com/logo_P.png" alt="PROTECSA Logo" style="height: 64px;" />
            </div>
            <h2 style="text-align: center; color: #003ce5; font-size: 24px; margin-bottom: 18px;">Confirma tu cuenta</h2>
            <p style="font-size: 17px; color: #333; text-align: center; margin: 0 0 12px;">
              Hola <strong>${nombre} ${apellido}</strong>, gracias por registrarte en <strong>PROTECSA</strong>.
            </p>
            <p style="font-size: 15px; color: #444; text-align: center;">
              Haz clic en el siguiente botón para activar tu cuenta:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verifyLink}" style="
                background-color: #003ce5;
                color: white;
                font-weight: bold;
                padding: 12px 28px;
                border-radius: 32px;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;">
                Confirmar mi cuenta
              </a>
            </div>
            <p style="font-size: 13px; color: #777; text-align: center;">
              Si no solicitaste esta cuenta, puedes ignorar este mensaje.
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://www.facebook.com/proteco" style="margin: 0 10px;">
                <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" width="24" height="24" />
              </a>
              <a href="https://www.instagram.com/protecsaunam/" style="margin: 0 10px;">
                <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" width="24" height="24" />
              </a>
              <a href="mailto:contacto@protecsaa.com" style="margin: 0 10px;">
                <img src="https://cdn-icons-png.flaticon.com/24/561/561127.png" alt="Email" width="24" height="24" />
              </a>
            </div>
            <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 20px;">
              &copy; ${new Date().getFullYear()} PROTECSA. Todos los derechos reservados.
            </p>
          </div>
        </div>
      `
      });


    console.log("📬 Correo enviado con Resend:", response);
    return NextResponse.json({ message: 'Registro exitoso. Revisa tu correo para confirmar tu cuenta.' });

  } catch (error) {
    console.error('❌ Error general en registro:', error);
    return NextResponse.json({ error: 'Error inesperado. Intenta nuevamente.' }, { status: 500 });
  }
}
