// components/coach/home/RecentActivityTile.jsx
export default function RecentActivityTile() {
  const activities = [
    { date: "17 avril", type: "Entraînement", label: "Endurance et vitesse", status: "✓ Complet", color: "text-green-600" },
    { date: "16 avril", type: "Match", label: "VS FC Lyon", status: "❌ Défaite 1-3", color: "text-red-500" },
    { date: "15 avril", type: "Entraînement", label: "Tactique 4-3-3", status: "✓ Complet", color: "text-green-600" },
    { date: "12 avril", type: "Match", label: "VS OM U19", status: "⚠ 3 absents", color: "text-yellow-500" },
    { date: "11 avril", type: "Entraînement", label: "Jeu de position", status: "⚠ 2 absents", color: "text-yellow-500" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-5 col-span-1 md:col-span-2">
      <h2 className="text-xl font-semibold mb-4">Historique des matchs et des entraînements</h2>
      <ul className="divide-y divide-gray-200 text-sm">
        {activities.map((a, index) => (
          <li key={index} className="py-2 flex justify-between items-center">
            <div>
              <span className="font-medium">{a.date}</span> — <span className="italic text-gray-600">{a.type}</span><br />
              <span className="text-gray-800">{a.label}</span>
            </div>
            <span className={`${a.color} font-medium`}>{a.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
