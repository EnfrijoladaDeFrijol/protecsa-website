export default function SobreNosotros() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-42 px-6 text-white"
      style={{ backgroundImage: 'url(/fc1.jpg)' }}
    >
      {/* Capa oscura + blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

      {/* Contenido directamente sobre fondo */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6 drop-shadow-md">
          ¿Quiénes somos?
        </h2>
        <p className="text-lg leading-relaxed drop-shadow-md">
          PROTECSA es una asociación estudiantil de la Facultad de Ciencias de la UNAM. Nos dedicamos a ofrecer cursos
          intersemestrales de alta calidad a estudiantes y público general. Nuestro objetivo es generar aprendizaje
          colaborativo y experiencias útiles para el desarrollo académico y profesional.
        </p>
      </div>
    </section>
  );
}
