import { MapPin } from "lucide-react";

export default function LocationTile({ location, setLocation }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4" /> Lieu d'entraînement
      </h3>
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border px-2 py-1 rounded"
      >
        <option>Stade Mathieu Bodmer</option>
        <option>Stade Paul Coudray</option>
        <option>Gymnase Les Fontenelles</option>
      </select>
    </div>
  );
}
