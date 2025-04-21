export default function TeamTile() {
    const mockPlayersCount = 18;
  
    return (
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-xl font-semibold mb-2">Effectif</h2>
        <p className="text-4xl font-bold">{mockPlayersCount}</p>
        <p className="text-sm text-gray-500">joueurs disponibles</p>
      </div>
    );
  }
  