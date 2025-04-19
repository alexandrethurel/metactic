// components/coach/trainings/PlayerCard.jsx
import { GripVertical, Footprints, User } from "lucide-react";

export default function PlayerCard({ player }) {
  return (
    <div className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-md p-4 mb-2 flex justify-between items-center transition-shadow duration-200">
      <div className="flex items-center gap-4">
        {/* Grip */}
        <div className="text-gray-600 cursor-grab">
          <GripVertical size={24} />
        </div>

        {/* Avatar */}
        <img
          src={player.avatar_url}
          alt={`${player.first_name} ${player.last_name}`}
          className="w-10 h-10 rounded-full border border-gray-300"
        />

        {/* Infos joueur */}
        <div>
          <h3 className="font-semibold text-sm">
            {player.first_name}
          </h3>
          <p className="text-xs text-gray-500 capitalize">
            {player.last_name}
          </p>
        </div>
      </div>
    </div>
  );
}
