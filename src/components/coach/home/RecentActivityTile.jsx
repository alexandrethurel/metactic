"use client";

import { useRouter } from "next/navigation";
import { trainings } from "@/lib/mocks/trainings";
import { matches } from "@/lib/mocks/matches";

export default function RecentActivityTile() {
  const router = useRouter();

  // 🔄 Unifie trainings + matches
  const activities = [
    ...trainings.map((t) => ({
      date: t.date,
      type: "Entraînement",
      label: t.title,
      status: "✓ Complet",
      color: "text-green-600",
      self: t.self,
    })),
    ...matches.map((m) => ({
      date: m.date,
      type: "Match",
      label: `${m.opponent}`,
      status: m.is_done
        ? m.goals_for != null && m.goals_against != null
          ? m.goals_for > m.goals_against
            ? `✅ Victoire ${m.goals_for}-${m.goals_against}`
            : `❌ Défaite ${m.goals_for}-${m.goals_against}`
          : "✅ Terminé"
        : "🕒 À venir",
      color: m.is_done
        ? m.goals_for > m.goals_against
          ? "text-green-600"
          : "text-red-500"
        : "text-gray-500",
      self: m.self,
    })),
  ];

  const sortedActivities = activities.sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="bg-white rounded-lg shadow p-5 col-span-1 md:col-span-2 max-h-[68vh] flex flex-col">
      {/* Titre fixe */}
      <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-white z-10 pb-2">
        Historique des matchs et des entraînements
      </h2>

      {/* Liste scrollable */}
      <div className="overflow-y-auto pr-1">
        <ul className="divide-y divide-gray-200 text-sm">
          {sortedActivities.map((a, index) => (
            <li
              key={index}
              onClick={() => router.push(a.self)}
              className="py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition rounded-sm px-1"
            >
              <div>
                <span className="font-medium">
                  {new Date(a.date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                  })}
                </span>{" "}
                —{" "}
                <span className="italic text-gray-600">{a.type}</span>
                <br />
                <span className="text-gray-800">{a.label}</span>
              </div>
              <span className={`${a.color} font-medium text-right text-sm mr-5`}>
                {a.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
