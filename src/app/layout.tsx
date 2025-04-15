import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AOSInit from '@/components/AOSInit'; 
//import { SessionProvider } from 'next-auth/react'; // Para el incio de seison

// Configuración de fuentes
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata general
export const metadata: Metadata = {
  title: 'PROTECSA',
  description: 'Sitio oficial de PROTECSA.',
  icons: {
    icon: 'favicon_io/favicon.ico',
  },
};

// Configuración de viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Layout principal
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AOSInit />
          {children}
      </body>
    </html>
  );
}

