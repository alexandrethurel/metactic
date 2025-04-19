// components/coach/home/RankingTile.jsx
import { ShieldCheck, Lock } from "lucide-react";

export default function RankingTile() {
  const teamId = "metactic-fc";

  const rankingData = [
    { id: "red-stars", name: "Red Stars", points: 38, diff: 25 },
    { id: "blue-wolves", name: "Blue Wolves", points: 35, diff: 20 },
    { id: "metactic-fc", name: "Metactic FC", points: 33, diff: 18 },
    { id: "gold-lions", name: "Gold Lions", points: 31, diff: 15 },
    { id: "black-panthers", name: "Black Panthers", points: 28, diff: 10 },
    { id: "green-dragons", name: "Green Dragons", points: 24, diff: 5 },
    { id: "silver-hawks", name: "Silver Hawks", points: 21, diff: 0 },
    { id: "violet-tigers", name: "Violet Tigers", points: 18, diff: -4 },
    { id: "white-bulls", name: "White Bulls", points: 14, diff: -10 },
    { id: "shadow-crows", name: "Shadow Crows", points: 10, diff: -15 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-5 col-span-1 md:col-span-2 relative overflow-hidden">
      {/* Titre non flouté */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 z-10 relative">
        <ShieldCheck className="w-5 h-5 text-blue-600" />
        Classement
      </h2>

      {/* Conteneur du tableau */}
      <div className="relative">
        {/* Tableau complet */}
        <div className="relative z-10">
          <table className="w-full text-sm table-auto border-collapse">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="text-left py-2">#</th>
                <th className="text-left py-2">Équipe</th>
                <th className="text-center py-2">Pts</th>
                <th className="text-center py-2">Diff</th>
              </tr>
            </thead>
            <tbody>
              {rankingData.map((team, index) => {
                const isCoachTeam = team.id === teamId;
                return (
                  <tr
                    key={team.id}
                    className={`border-b last:border-b-0 ${
                      isCoachTeam
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">
                      {team.name}
                      {isCoachTeam && (
                        <span className="ml-1 text-xs text-blue-500 font-medium">(vous)</span>
                      )}
                    </td>
                    <td className="text-center py-2">{team.points}</td>
                    <td className="text-center py-2">
                      {team.diff >= 0 ? `+${team.diff}` : team.diff}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Overlay flou + message d’indisponibilité */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex items-center justify-center pointer-events-none rounded-b-lg">
          <p className="flex items-center gap-2 font-medium text-[#0B1231]">
            <Lock className="w-4 h-4 text-orange-500" />
            Fonctionnalité indisponible pour le moment
          </p>
        </div>
      </div>
    </div>
  );
}
