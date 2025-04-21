"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Download, Sparkles, ChevronDown } from "lucide-react";

import { getMatchById } from "@/lib/api/coach/matches";
import { formations } from "@/lib/mocks/formations";
import { formationPositions } from "@/lib/mocks/formationPositions";
import { players } from "@/lib/mocks/players";
import { users } from "@/lib/mocks/users";

const DatePickerTile = dynamic(() => import("@/components/coach/matches/preparation/DatePickerTile"), { ssr: false });
const OpponentTile = dynamic(() => import("@/components/coach/matches/preparation/OpponentTile"), { ssr: false });
const LocationTile = dynamic(() => import("@/components/coach/matches/preparation/LocationTile"), { ssr: false });
const FormationTile = dynamic(() => import("@/components/coach/matches/preparation/FormationTile"), { ssr: false });
const PlayersTile = dynamic(() => import("@/components/coach/matches/preparation/PlayersTile"), { ssr: false });

export default function PreparationPage() {
  const { id_match } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const [assignments, setAssignments] = useState({});
  const [matchDate, setMatchDate] = useState(new Date());
  const [opponent, setOpponent] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFormation, setSelectedFormation] = useState(formations[0]);

  const formationRef = useRef(null);

  useEffect(() => {
    const loadMatch = async () => {
      const m = await getMatchById(id_match);
      if (!m) return;
      setMatch(m);
      setAssignments(m.assignments);
      setMatchDate(new Date(m.date));
      setOpponent(m.opponent);
      setLocation(m.location);
      const f = formations.find((f) => f.id === m.formation_id);
      if (f) setSelectedFormation(f);
      setLoading(false);
    };

    loadMatch();
  }, [id_match]);

  useEffect(() => {
    if (!match) return;
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

  const positions = useMemo(() => {
    return formationPositions.filter((fp) => fp.formation_id === selectedFormation.id);
  }, [selectedFormation]);

  const playersMap = useMemo(() => {
    const usersMap = Object.fromEntries(users.map((u) => [u.id, u]));
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
      : match.available_player_ids.find((id) => !usedPlayerIds.includes(id));

    if (!newPlayerId) return;

    const fromPosition = Object.keys(assignments).find((key) => assignments[key] === newPlayerId);
    setAssignments((prev) => {
      const newAssign = { ...prev };
      if (fromPosition) {
        newAssign[fromPosition] = prev[positionId];
      }
      newAssign[positionId] = newPlayerId;
      return newAssign;
    });
  };

  if (loading) return <p className="text-white p-6">Chargement...</p>;
  if (!match) return <p className="text-red-500 p-6">Match introuvable.</p>;

  return (
    <div className="min-h-screen bg-[#1c2b2d] text-white p-6 space-y-6 font-sans">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-[#223538] text-lg font-bold py-3 px-4 rounded shadow">
          Préparation du match — <span className="text-green-400">{opponent}</span>
        </div>
        <div className="flex gap-3 items-center">
          <div className="relative group">
            <div className="absolute z-10 mt-2 w-48 bg-white text-black rounded shadow hidden group-hover:block">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Meilleur XI</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Temps de jeu</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Faire tourner</button>
            </div>
          </div>
          <a
            href="/rapport_match_metactic_pro.pdf"
            download
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 shadow"
          >
            <Download size={16} /> Exporter PDF
          </a>
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 shadow">
            ✅ Valider
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DatePickerTile date={matchDate} onChange={setMatchDate} />
        <OpponentTile opponent={opponent} onChange={setOpponent} />
        <LocationTile location={location} onChange={setLocation} />
      </div>

      <div className="flex gap-4 items-start">
        <div className="w-2/3 bg-[#2e4447] p-4 rounded shadow" ref={formationRef}>
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
          className="w-1/3 bg-[#2e4447] p-4 rounded shadow overflow-y-auto"
          style={{ maxHeight: formationRef.current?.offsetHeight || "auto" }}
        >
          <PlayersTile
            availableIds={match.available_player_ids}
            invitedIds={match.invited_player_ids}
          />
        </div>
      </div>
    </div>
  );
}
