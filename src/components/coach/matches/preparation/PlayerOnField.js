"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, Unlock, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function PlayerOnField({
  player,
  position,
  x,
  y,
  onClick,
  onDropPlayer,
}) {
  const [locked, setLocked] = useState(false);

  if (!player || !position) {
    console.warn("⛔ player or position is missing:", { player, position });
    return null;
  }

  const getColorFromLongName = (longName) => {
    if (!longName) return "bg-gray-600";
    const lower = longName.toLowerCase();
    if (lower.includes("défenseur") || lower.includes("arrière")) return "bg-red-600";
    if (lower.includes("milieu")) return "bg-blue-600";
    if (lower.includes("attaquant") || lower.includes("ailier")) return "bg-green-600";
    return "bg-gray-600";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const fromPlayerId = e.dataTransfer.getData("playerId");
    console.log("⬇️ Drop detected on position", position.id, "from player", fromPlayerId);
    if (fromPlayerId && onDropPlayer && !locked) {
      onDropPlayer(position.id, fromPlayerId);
    }
  };

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        top: `${y}%`,
        left: `${x}%`,
        transform: "translate(-50%, -50%)",
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Maillot (draggable) */}
      <div
        className="relative w-12 h-12 cursor-grab"
        draggable={!locked}
        onDragStart={(e) => {
          if (locked) return e.preventDefault();
          console.log("📦 Drag started:", player.id);
          e.dataTransfer.setData("playerId", player.id);
        }}
      >
        <Image
          src="/football-shirt.svg"
          alt="Maillot"
          width={48}
          height={48}
          className="absolute inset-0"
        />
      </div>

      {/* Infos joueur */}
      <div className="mt-1 bg-[#1a1f1f] bg-opacity-80 text-white rounded px-2 py-1 text-xs w-32 space-y-1">
        <div
          className={`text-center font-bold ${getColorFromLongName(position.long_name)} rounded text-white px-1`}
        >
          {position.short_name}
        </div>

        <div className="relative flex items-center gap-1 justify-between">
          <button
            onClick={() => setLocked((prev) => !prev)}
            className="text-gray-300 hover:text-white"
            title={locked ? "Déverrouiller" : "Verrouiller"}
          >
            {locked ? <Lock size={12} className="text-red-400" /> : <Unlock size={12} className="text-white" />}
          </button>

          <Link href={player.profileUrl || "#"} className="flex-1 text-center">
            <span className="hover:underline font-medium truncate">
              {player.name}
            </span>
          </Link>

          <button
            onClick={onClick}
            className="text-gray-300 hover:text-white"
            title="Changer"
          >
            <MoreVertical size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
