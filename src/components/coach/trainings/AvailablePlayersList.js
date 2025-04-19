import { useEffect, useState } from "react";
import { fetchAvailablePlayersWithUserInfo } from "@/lib/api/coach/players";
import PlayerCard from "@/components/coach/trainings/PlayerCard";

export default function AvailablePlayersSection() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const loadPlayers = async () => {
      const res = await fetchAvailablePlayersWithUserInfo();
      setPlayers(res);
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
