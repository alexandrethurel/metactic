import { Sparkles } from "lucide-react";

export default function AiSuggestionTile({ onOpenModal }) {

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-2">Suggestion IA</h2>
      <p className="text-sm text-gray-500 mb-3">
        Laissez l'IA analyser l'équipe pour vous proposer des recommandations.
      </p>
      <button
        onClick={onOpenModal}
        className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" /> Lancer l'analyse
      </button>
    </div>
  );
}