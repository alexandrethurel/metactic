import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

function ExerciseCard({ title, description }) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-4 border border-gray-200 shadow-sm">
      <div className="flex-shrink-0 bg-green-100 text-green-600 rounded-full p-2">
        <Sparkles className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-semibold text-md text-[#0B1231] mb-1">{title}</h3>
        <p className="text-sm text-gray-600 leading-snug">{description}</p>
      </div>
    </div>
  );
}

export default function AiSessionModal({ onClose }) {
  const [visible, setVisible] = useState(false);

  const exercises = [
    { title: "Rondo 5v2", description: "Travail de possession et de pressing en espace réduit." },
    { title: "Course fractionnée", description: "Amélioration de l'endurance et de la récupération." },
    { title: "Jeu de position 8v8", description: "Organisation offensive avec transitions rapides." },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>

      <div
        className={`relative bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl z-10 transform transition-all duration-300 ease-out ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-[#0B1231]">Séance générée par IA</h2>

        <div className="grid gap-4 mb-6">
          {exercises.map((ex, i) => (
            <ExerciseCard key={i} title={ex.title} description={ex.description} />
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded border border-[#0B1231] text-[#0B1231] hover:bg-[#0B1231] hover:text-white"
            onClick={onClose}
          >
            Refuser
          </button>
          <button
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
            onClick={onClose}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
