"use client";

export default function PlayerOnCard({ player }) {
  const {
    id,
    first_name,
    last_name,
    position,
    is_available,
    present_last_training,
    last_training_date,
    minutes_played,
  } = player;

  const getRoleColorTag = (pos) => {
    const p = pos?.toLowerCase();
    if (!p) return "bg-gray-600";
    if (p.includes("défenseur") || p.includes("arrière")) return "bg-red-600";
    if (p.includes("milieu")) return "bg-blue-600";
    if (p.includes("attaquant") || p.includes("ailier")) return "bg-green-600";
    return "bg-gray-600";
  };

  return (
    <div
      className="border border-gray-600 px-4 py-3 rounded bg-[#1c2b2d] hover:bg-[#26393b] transition flex flex-col space-y-1 text-sm cursor-grab"
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData("playerId", id);
        e.dataTransfer.effectAllowed = "move";
      }}
    >
      <div className="flex justify-between items-center">
        <a
            href={`/coach/players/${id}`}
            className="font-medium truncate hover:underline text-white/90 hover:text-green-400 transition"
            >
            {first_name} {last_name}
        </a>
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            is_available ? "bg-green-500" : "bg-red-500"
          }`}
          title={is_available ? "Disponible" : "Indisponible"}
        />
      </div>

      <div className="flex items-center flex-wrap gap-2 text-xs mt-1">
        <span
          className={`px-2 py-0.5 rounded-full text-white ${getRoleColorTag(position)}`}
        >
          {position}
        </span>
        <span className="text-gray-400">
          Dernier entraînement :{" "}
          {present_last_training ? (
            <span className="text-green-400 font-semibold">✔</span>
          ) : (
            <span className="text-red-400 font-semibold">✘</span>
          )}{" "}
          — {last_training_date}
        </span>
        <span className="ml-auto font-mono text-gray-300">{minutes_played} min</span>
      </div>
    </div>
  );
}
