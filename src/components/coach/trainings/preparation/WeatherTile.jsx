import { CloudSun } from "lucide-react";

export default function WeatherTile({ weather }) {
  return (
    <div className="bg-white p-4 rounded shadow min-h-[300px]">
      <h3 className="font-semibold flex items-center gap-2 mb-2">
        <CloudSun className="w-4 h-4" /> Météo prévue
      </h3>
      <p><strong>Lieu :</strong> {weather.location}</p>
      <p><strong>Conditions :</strong> {weather.condition}</p>
      <p><strong>Température :</strong> {weather.temperature}</p>
    </div>
  );
}
