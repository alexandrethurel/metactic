import { Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function TypeSelectTile({ selectedTypes, setSelectedTypes, iaThemes }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4" /> Type(s) de séance
      </h3>
      <Select
        options={iaThemes}
        value={selectedTypes}
        onChange={setSelectedTypes}
        isMulti
        placeholder="Choisir les objectifs..."
        className="text-sm"
        classNamePrefix="select"
        closeMenuOnSelect={false}
      />
    </div>
  );
}
