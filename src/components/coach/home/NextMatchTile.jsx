export default function NextMatchTile() {
    const match = {
      opponent: "US Villeurbane",
      date: "Samedi 26 avril",
      hour: "15h00",
      location: "Stade Boiron-Granger",
    };
  
    return (
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-xl font-semibold mb-2">Prochain match</h2>
        <p className="text-lg font-medium">{match.opponent}</p>
        <p className="text-sm text-gray-500">{match.date} - {match.hour}</p>
        <p className="text-sm text-gray-400">{match.location}</p>
      </div>
    );
  }
  