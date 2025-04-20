"use client";

export default function LocationTile({ location, onChange }) {
  return (
    <div className="bg-[#2e4447] p-4 rounded shadow text-white">
      <h3 className="font-semibold mb-2 text-sm">Lieu</h3>
      <input
        type="text"
        value={location}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Lieu du match"
        className="w-full bg-[#1c2b2d] text-white border border-gray-600 px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
      />
    </div>
  );
}
