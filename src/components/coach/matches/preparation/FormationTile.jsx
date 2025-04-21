"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import PlayerOnField from "./PlayerOnField";
import { useState, useRef, useEffect } from "react";

/**
 * Affiche un sélecteur de formation et un terrain avec les joueurs positionnés.
 *
 * @param {Object} props
 * @param {Array} props.formations - Liste des formations disponibles
 * @param {Object} props.selectedFormation - Formation actuellement sélectionnée
 * @param {Function} props.onSelect - Callback quand on change de formation
 * @param {Array} props.positions - Positions du terrain pour la formation
 * @param {Object} props.assignments - Mapping positionId → playerId
 * @param {Object} props.playersMap - Mapping playerId → player enrichi
 * @param {Function} props.onPlayerClick - Callback pour clic ou drop (positionId, [playerId])
 */
export default function FormationTile({
  formations,
  selectedFormation,
  onSelect,
  positions,
  assignments,
  playersMap,
  onPlayerClick,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const handleQuickSelect = (type) => {
    alert(`Sélection rapide : ${type}`);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#2e4447] p-4 rounded shadow space-y-4 text-white">
      {/* Sélecteur de formation + sélection rapide */}
      <div className="flex items-center justify-between">
        <label className="font-semibold text-sm">Formation</label>
        <div className="flex gap-2 items-center">
          <div className="relative w-48">
            <select
              value={selectedFormation?.id || ""}
              onChange={(e) => {
                const f = formations.find((f) => f.id === e.target.value);
                onSelect(f);
              }}
              className="appearance-none w-full bg-[#1c2b2d] text-white border border-gray-600 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="" disabled>
                Choisir une formation…
              </option>
              {formations.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Sélection rapide */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded shadow-md transition duration-200"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              Sélection rapide
              <ChevronDown className="w-4 h-4" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 z-20 mt-2 w-52 bg-[#1c2b2d] border border-green-600 text-white rounded-xl shadow-xl">
                <button
                  onClick={() => handleQuickSelect("Meilleur XI")}
                  className="w-full text-left px-5 py-3 hover:bg-green-700 hover:text-white text-sm transition-colors duration-150 rounded-t-xl"
                >
                  ⭐ Meilleur XI
                </button>
                <button
                  onClick={() => handleQuickSelect("Temps de jeu")}
                  className="w-full text-left px-5 py-3 hover:bg-green-700 hover:text-white text-sm transition-colors duration-150"
                >
                  ⏱ Temps de jeu
                </button>
                <button
                  onClick={() => handleQuickSelect("Faire tourner")}
                  className="w-full text-left px-5 py-3 hover:bg-green-700 hover:text-white text-sm transition-colors duration-150 rounded-b-xl"
                >
                  🔁 Faire tourner
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terrain + joueurs */}
      <div
        className="relative w-full h-0 pb-[75%] bg-center bg-cover rounded overflow-hidden border border-gray-700"
        style={{ backgroundImage: "url('/football-field.jpg')" }}
      >
        {positions.map((pos) => {
          const playerId = assignments[pos.id];
          const player = playersMap[playerId];

          return (
            <PlayerOnField
              key={pos.id}
              player={player}
              position={pos}
              x={pos.x + 5}
              y={pos.y}
              onClick={() => onPlayerClick(pos.id)}
              onDropPlayer={onPlayerClick}
            />
          );
        })}
      </div>
    </div>
  );
}
