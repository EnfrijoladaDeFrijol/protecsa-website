// ==========================
//  GUÍA PARA EDITAR ANUNCIOS
// ==========================
//
// Este archivo define los anuncios que se muestran en el carrusel de la sección "Novedades".
// Cada objeto representa un anuncio, con su imagen y un enlace opcional a un PDF.
//
// 📁 ESTRUCTURA DE CARPETAS (dentro de la carpeta 'public'):
//
//  public/
//  └── anuncios/
//      ├── images/   ← aquí van las imágenes (.jpg, .png)
//      └── docs/     ← aquí van los archivos PDF (opcional)
//
// ✅ EJEMPLO DE ANUNCIO:
//
// {
//   titulo: 'Nombre del anuncio',
//   imagen: '/anuncios/images/nombre_imagen.jpg',  // Ruta relativa desde /public
//   pdf: '/anuncios/docs/nombre_pdf.pdf'           // Ruta relativa (opcional) — si no hay PDF, usar null
// }
//
// 📌 REGLAS:
//
// - La propiedad `imagen` es obligatoria. Debe apuntar a un archivo dentro de /public/anuncios/images/
// - La propiedad `pdf` es opcional. Si no hay PDF para ese anuncio, pon `pdf: null`
// - Asegúrate de que los nombres de archivos NO tengan espacios ni caracteres especiales
// - Cada vez que agregues o cambies una imagen o PDF, coloca el archivo correspondiente en la carpeta correcta
//
// 🔁 Para agregar un nuevo anuncio:
// 1. Copia uno de los objetos del arreglo
// 2. Modifica `titulo`, `imagen` y (si aplica) `pdf`
// 3. Guarda la imagen en public/anuncios/images/
// 4. Guarda el PDF (si aplica) en public/anuncios/docs/
//


export const anuncios = [

  {
    titulo: 'Segunda generacion',
    imagen: '/anuncios/images/2gen.jpg',
    pdf: null,
  },
  {
    titulo: 'Cursos gratis',
    imagen: '/anuncios/images/cursos_gratis.jpg',
    pdf: '/anuncios/docs/cursos_gratis.pdf',
  },

  {
    titulo: 'Proteco se convierte en Protecsa',
    imagen: '/anuncios/images/proteco_protecsa.jpg',
    pdf: '/anuncios/docs/proteco_protecsa.pdf',
  },
  
];