"use client";

import { useMemo } from "react";
import { players } from "@/lib/mocks/players";
import { users } from "@/lib/mocks/users";
import PlayerOnCard from "./PlayerOnCard"; 

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
        <PlayerOnCard key={p.id} player={p} />
      ))}
    </div>
  );
}
