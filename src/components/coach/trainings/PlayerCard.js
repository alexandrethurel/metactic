export default function PlayerCard({ player }) {
  const isGoalkeeper = player.main_position === "goalkeeper";

  return (
    <div className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-md p-4 mb-2 flex items-center gap-4 transition-shadow duration-200">
      {/* Avatar */}
      <img
        src={player.avatar_url}
        alt={`${player.first_name} ${player.last_name}`}
        className="w-10 h-10 rounded-full border border-gray-300"
      />

      {/* Infos joueur */}
      <div>
        <h3 className="font-semibold text-sm">
          {player.first_name}{" "}
          {isGoalkeeper && (
            <span className="text-xs text-blue-500 font-normal">(gardien)</span>
          )}
        </h3>
        <p className="text-xs text-gray-500 capitalize">
          {player.last_name}
        </p>
      </div>
    </div>
  );
}
