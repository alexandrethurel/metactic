"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";

import { matches } from "@/lib/mocks/matches";
import { formations } from "@/lib/mocks/formations";
import { formationPositions } from "@/lib/mocks/formationPositions";
import { players } from "@/lib/mocks/players";
import { users } from "@/lib/mocks/users";

import DatePickerTile from "@/components/coach/matches/preparation/DatePickerTile";
import OpponentTile from "@/components/coach/matches/preparation/OpponentTile";
import LocationTile from "@/components/coach/matches/preparation/LocationTile";
import FormationTile from "@/components/coach/matches/preparation/FormationTile";
import PlayersTile from "@/components/coach/matches/preparation/PlayersTile";
import { Download } from "lucide-react";

export default function PreparationPage() {
  const { id_match } = useParams();
  const match = matches.find((m) => m.id === id_match);

  const [assignments, setAssignments] = useState(match.assignments);
  const [matchDate, setMatchDate] = useState(match ? new Date(match.date) : new Date());
  const [opponent, setOpponent] = useState(match?.opponent || "");
  const [location, setLocation] = useState(match?.location || "");
  const [selectedFormation, setSelectedFormation] = useState(() => {
    return formations.find((f) => f.id === match?.formation_id) || formations[0];
  });

  const formationRef = useRef(null);

  useEffect(() => {
    if (match) {
      setMatchDate(new Date(match.date));
      setOpponent(match.opponent);
      setLocation(match.location);
      const f = formations.find((f) => f.id === match.formation_id);
      if (f) setSelectedFormation(f);
    }
  }, [match]);

  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.style.backgroundColor = "#1c2b2d";
    }
  }, []);

  useEffect(() => {
    const newPositions = formationPositions.filter(
      (fp) => fp.formation_id === selectedFormation.id
    );

    const newAssignments = {};
    newPositions.forEach((pos, i) => {
      const currentAssignedPlayer = Object.values(assignments)[i];
      newAssignments[pos.id] = currentAssignedPlayer || null;
    });

    setAssignments(newAssignments);
  }, [selectedFormation]);

  if (!match) {
    return <p className="p-6 text-red-600">Match introuvable.</p>;
  }

  const positions = useMemo(() => {
    return formationPositions.filter((fp) => fp.formation_id === selectedFormation?.id);
  }, [selectedFormation]);

  const playersMap = useMemo(() => {
    const usersMap = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    return players.reduce((acc, p) => {
      const user = usersMap[p.user_id];
      acc[p.id] = {
        ...p,
        name: user?.call_name || "Inconnu",
        avatarUrl: user?.avatarUrl || null,
      };
      return acc;
    }, {});
  }, []);

  const handlePlayerClick = (positionId, forcedPlayerId = null) => {
    const usedPlayerIds = Object.values(assignments).filter(Boolean);

    const newPlayerId = forcedPlayerId
      ? forcedPlayerId
      : (() => {
          const available = match.available_player_ids.filter(
            (id) => !usedPlayerIds.includes(id)
          );

          if (available.length === 0) {
            console.warn("Aucun joueur disponible pour remplacement");
            return null;
          }

          return available[Math.floor(Math.random() * available.length)];
        })();

    if (!newPlayerId) return;

    const fromPosition = Object.keys(assignments).find(
      (key) => assignments[key] === newPlayerId
    );

    if (fromPosition) {
      setAssignments((prev) => ({
        ...prev,
        [positionId]: newPlayerId,
        [fromPosition]: prev[positionId],
      }));
    } else {
      setAssignments((prev) => ({
        ...prev,
        [positionId]: newPlayerId,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#1c2b2d] text-white p-6 space-y-6 font-sans">
      {/* Bandeau titre */}
      <div className="bg-[#223538] text-center text-lg font-bold py-3 rounded shadow">
        Préparation du match - <span className="text-green-400">{opponent}</span>
      </div>

      {/* Row 1 : Date / Adversaire / Lieu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DatePickerTile date={matchDate} onChange={setMatchDate} />
        <OpponentTile opponent={opponent} onChange={setOpponent} />
        <LocationTile location={location} onChange={setLocation} />
      </div>

      {/* Row 2 : Formation + Joueurs */}
      <div className="flex gap-4 items-start">
        <div
          className="w-2/3 bg-[#2e4447] p-4 rounded shadow flex flex-col"
          ref={formationRef}
        >
          <FormationTile
            formations={formations}
            selectedFormation={selectedFormation}
            onSelect={setSelectedFormation}
            positions={positions}
            assignments={assignments}
            playersMap={playersMap}
            onPlayerClick={handlePlayerClick}
          />
        </div>
        <div
          className="w-1/3 bg-[#2e4447] p-4 rounded shadow flex flex-col overflow-y-auto"
          style={{ maxHeight: formationRef.current?.offsetHeight || "auto" }}
        >
          <PlayersTile
            availableIds={match.available_player_ids}
            invitedIds={match.invited_player_ids}
          />
        </div>
      </div>

      {/* Footer bouton */}
      <div className="pt-4 flex justify-between items-center">
        <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 shadow">
          <Download size={16} /> Exporter en PDF
        </button>
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 shadow">
          Valider la composition
        </button>
      </div>
    </div>
  );
}
