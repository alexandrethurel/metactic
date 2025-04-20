"use client";

import { useMemo } from "react";
import { players } from "@/lib/mocks/players";
import { users } from "@/lib/mocks/users";

const getRandomPresence = () => Math.random() > 0.3;
const getRandomMinutes = () => Math.floor(Math.random() * 800);
const getRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 10));
  return date.toLocaleDateString("fr-FR");
};

function formatPosition(rawPosition) {
  if (!rawPosition) return "Inconnu";
  const replaced = rawPosition.replace(/_/g, " ");
  return replaced.charAt(0).toUpperCase() + replaced.slice(1);
}

function getRoleColorTag(position) {
  const pos = position?.toLowerCase();
  if (!pos) return "bg-gray-600";
  if (pos.includes("défenseur") || pos.includes("arrière")) return "bg-red-600";
  if (pos.includes("milieu")) return "bg-blue-600";
  if (pos.includes("attaquant") || pos.includes("ailier")) return "bg-green-600";
  return "bg-gray-600";
}

export default function PlayersTile({ availableIds = [], invitedIds = [] }) {
  const playersList = useMemo(() => {
    const usersMap = users.reduce((acc, u) => {
      acc[u.id] = u;
      return acc;
    }, {});

    return players
      .map((p) => {
        const user = usersMap[p.user_id];
        const rawPosition = p.main_position || "N/A";
        return {
          ...p,
          first_name: user?.first_name || "",
          last_name: user?.last_name || "",
          position: formatPosition(rawPosition),
          is_available: availableIds.includes(p.id),
          present_last_training: getRandomPresence(),
          last_training_date: getRandomDate(),
          minutes_played: getRandomMinutes(),
        };
      })
      .sort((a, b) => (a.is_available === b.is_available ? 0 : a.is_available ? -1 : 1));
  }, [availableIds]);

  return (
    <div className="bg-[#2e4447] p-4 rounded shadow space-y-3 text-white">
      <h3 className="font-semibold text-sm mb-2">Joueurs de l'équipe</h3>

      {playersList.map((p) => (
        <div
          key={p.id}
          className="border border-gray-600 px-4 py-3 rounded bg-[#1c2b2d] hover:bg-[#26393b] transition flex flex-col space-y-1 text-sm"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium truncate">
              {p.first_name} {p.last_name}
            </span>
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                p.is_available ? "bg-green-500" : "bg-red-500"
              }`}
              title={p.is_available ? "Disponible" : "Indisponible"}
            />
          </div>

          <div className="flex items-center flex-wrap gap-2 text-xs mt-1">
            <span
              className={`px-2 py-0.5 rounded-full text-white ${getRoleColorTag(
                p.position
              )}`}
            >
              {p.position}
            </span>
            <span className="text-gray-400">
              Dernier entraînement :{" "}
              {p.present_last_training ? (
                <span className="text-green-400 font-semibold">✔</span>
              ) : (
                <span className="text-red-400 font-semibold">✘</span>
              )}{" "}
              — {p.last_training_date}
            </span>
            <span className="ml-auto font-mono text-gray-300">
              {p.minutes_played} min
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
