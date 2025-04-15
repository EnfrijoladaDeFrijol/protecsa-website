export interface Curso {
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  duracion: string;
  modalidad: string;
  calificacion: number;
  precio: number;
  temario: {
    modulo: string;
    temas: string[];
  }[];
  opiniones: {
    nombre: string;
    comentario: string;
    estrellas: number;
  }[];
}

export const cursos: Curso[] = [
  {
    slug: "python-analisis-datos",
    titulo: "Python para Análisis de Datos",
    descripcion: "Aprende a analizar datos usando Python y librerías como Pandas y Matplotlib.",
    imagen: "/cursos/python_AD.jpg",
    duracion: "4 semanas",
    modalidad: "En línea",
    calificacion: 4.7,
    precio: 1200,
    temario: [
      {
        modulo: "Módulo 1: Introducción a Python",
        temas: ["Sintaxis básica", "Tipos de datos", "Condicionales y bucles"]
      },
      {
        modulo: "Módulo 2: Análisis con Pandas",
        temas: ["Series y DataFrames", "Limpieza de datos", "Operaciones avanzadas"]
      }
    ],
    opiniones: [
      { nombre: "Ana", comentario: "¡Muy buen curso!", estrellas: 5 },
      { nombre: "Luis", comentario: "Me gustó mucho la parte práctica.", estrellas: 4 }
    ]
  },
  {
    slug: "python-inteligencia-artificial",
    titulo: "Python e Inteligencia Artificial",
    descripcion: "Introduce conceptos de machine learning con Python y scikit-learn.",
    imagen: "/cursos/python_IA.jpg",
    duracion: "6 semanas",
    modalidad: "En línea",
    calificacion: 4.8,
    precio: 1500,
    temario: [
      {
        modulo: "Módulo 1: Fundamentos de IA",
        temas: ["Aprendizaje supervisado", "Regresión", "Clasificación"]
      },
      {
        modulo: "Módulo 2: Scikit-learn",
        temas: ["Modelos", "Evaluación", "Tuning de hiperparámetros"]
      }
    ],
    opiniones: [
      { nombre: "Carlos", comentario: "Muy completo y bien explicado.", estrellas: 5 },
      { nombre: "Marta", comentario: "Ideal para empezar con IA.", estrellas: 5 }
    ]
  },
  {
    slug: "introduccion-excel",
    titulo: "Introducción a Excel",
    descripcion: "Domina herramientas de Excel para el análisis y visualización de datos.",
    imagen: "/cursos/excel_Intro.jpg",
    duracion: "3 semanas",
    modalidad: "Presencial",
    calificacion: 4.2,
    precio: 800,
    temario: [
      {
        modulo: "Módulo 1: Básico",
        temas: ["Fórmulas", "Formatos", "Tablas"]
      },
      {
        modulo: "Módulo 2: Gráficas y Funciones",
        temas: ["Funciones lógicas", "Gráficas dinámicas"]
      }
    ],
    opiniones: [
      { nombre: "Sofía", comentario: "Muy útil para la oficina.", estrellas: 4 },
      { nombre: "Andrés", comentario: "Rápido y directo al punto.", estrellas: 4 }
    ]
  },
  {
    slug: "introduccion-linux",
    titulo: "Introducción a GNU/Linux",
    descripcion: "Aprende a usar la terminal, comandos y administrar sistemas basados en Linux.",
    imagen: "/cursos/linux.jpg",
    duracion: "5 semanas",
    modalidad: "En línea",
    calificacion: 4.5,
    precio: 1000,
    temario: [
      {
        modulo: "Módulo 1: Terminal y comandos básicos",
        temas: ["cd, ls, mkdir", "Permisos", "Redirecciones"]
      },
      {
        modulo: "Módulo 2: Administración de sistemas",
        temas: ["Usuarios", "Procesos", "Servicios"]
      }
    ],
    opiniones: [
      { nombre: "Pedro", comentario: "Muy claro para principiantes.", estrellas: 4 },
      { nombre: "Julia", comentario: "Lo recomiendo ampliamente.", estrellas: 5 }
    ]
  },
  {
    slug: "sexo-competitivo",
    titulo: "SEXO COMPETITIVO",
    descripcion: "Descubre cómo despertar tu loba interior con técnicas infalibles de seducción y seguridad total, guiado por el legendario LEOSIGMA.",
    imagen: "/cursos/leo.jpg",
    duracion: "1 semana intensiva",
    modalidad: "Presencial",
    calificacion: 5,
    precio: 1500,
    temario: [
      {
        modulo: "Módulo 1: Desbloquea tu loba interior",
        temas: [
          "Mentalidad ganadora: actitud de loba alfa",
          "Look, postura y contacto visual magnético",
          "Psicología de la seguridad irresistible"
        ]
      },
      {
        modulo: "Módulo 2: Dominio corporal competitivo",
        temas: [
          "Lenguaje corporal provocador",
          "Control del ritmo y respiración estratégica",
          "Exploración con propósito: manos que conquistan"
        ]
      },
      {
        modulo: "Módulo 3: Juegos mentales de atracción",
        temas: [
          "Frases y silencios que enloquecen",
          "Control emocional y manejo de tensión",
          "Creación de un personaje irresistible"
        ]
      },
      {
        modulo: "Módulo 4: Loba Legendaria - Edición Final",
        temas: [
          "Simulación real con retroalimentación de Leo",
          "Dominancia de escenario y presencia",
          "Certificación: ¿Eres una loba oficial?"
        ]
      }
    ],
    opiniones: [
      { nombre: "LeoSigma", comentario: "El curso es tan intenso como efectivo. Si no te aúllan, lo estás haciendo mal. 🐺🔥", estrellas: 5 },
      { nombre: "Dani", comentario: "Nunca más volví a ser la misma. Ahora soy la *alfa alfa* de mi círculo. 💋", estrellas: 5 },
      { nombre: "Carla", comentario: "Conquisté a mi crush en menos de 48 horas. Increíble. Leo es un dios.", estrellas: 5 },
      { nombre: "Fer", comentario: "Pasé de modo sigilosa a modo loba competitiva en 7 días. RECOMENDADÍSIMO.", estrellas: 5 },
      { nombre: "Lau", comentario: "Esto no es un curso. Es una transformación. 💄🔥", estrellas: 5 }
    ]
  }  
];
