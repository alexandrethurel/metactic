import { useEffect, useState } from "react";
import { fetchAvailablePlayersWithUserInfo } from "@/lib/api/coach/players";
import PlayerCard from "@/components/coach/trainings/preparation/PlayerCard";

export default function AvailablePlayersSection() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const loadPlayers = async () => {
      const res = await fetchAvailablePlayersWithUserInfo();

      // Trie : gardiens d'abord
      const sorted = [...res].sort((a, b) => {
        const aIsGoalie = a.main_position.toLowerCase() === "goalkeeper";
        const bIsGoalie = b.main_position.toLowerCase() === "goalkeeper";
        if (aIsGoalie && !bIsGoalie) return -1;
        if (!aIsGoalie && bIsGoalie) return 1;
        return 0;
      });

      setPlayers(sorted);
    };
    loadPlayers();
  }, []);

  return (
    <div className="space-y-2">
      {players.map((p) => (
        <PlayerCard key={p.id} player={p} />
      ))}
    </div>
  );
}
