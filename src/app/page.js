// app/page.jsx

export default function LandingPage() {
  return (
  <section
    className="relative min-h-screen bg-cover bg-center flex items-center"
    style={{ backgroundImage: "url('/landing-pic.png')" }}
  >
    {/* Overlay dégradé en diagonale */}
    <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/30 z-0"></div>
  
    {/* Contenu centré avec structure 2 colonnes */}
    <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
      {/* Bloc texte gauche */}
      <div className="w-full md:w-1/2 text-white text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
        Gagnez du temps. Gagnez en performance.
        </h1>
        <p className="mb-6 text-lg max-w-md">
        Metactic réinvente la gestion d’équipe avec une plateforme innovante, simple et ultra complète.<br /> <br /> 
        Centralisez vos séances, vos tactiques, le suivi de l’effectif, la communication de l’équipe… et concentrez-vous sur ce qui compte vraiment : faire progresser votre équipe.        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <button className="bg-green-500 px-6 py-3 rounded text-white hover:bg-green-600 text-sm">
            Inscrire mon équipe
          </button>
          <button className="bg-white px-6 py-3 rounded text-[#0B1231] hover:bg-gray-100 text-sm">
            Inscrire mon club
          </button>
        </div>
      </div>
  
      {/* Image droite */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src="/phone-mockup.png"
          alt="App Screenshot"
          className="w-[280px] md:w-[360px] lg:w-[400px] drop-shadow-xl"
        />
      </div>
    </div>
  </section>
  );
}
