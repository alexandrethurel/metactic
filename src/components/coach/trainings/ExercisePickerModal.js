import Modal from "@/components/coach/ui/Modal";
import { useState, useEffect } from "react";
import { fetchAllExercises } from "@/lib/api/coach/exercises";

export default function ExercisePickerModal({ selectedTypes, onConfirm, onClose }) {
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const all = await fetchAllExercises();
      const filtered = all.filter((exo) =>
        exo.tags.some((tag) => selectedTypes.map((t) => t.value).includes(tag))
      );
      setAvailableExercises(filtered);
    };
  
    fetchData();
  }, [selectedTypes]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    const toAdd = availableExercises.filter((e) => selected.includes(e.id));
    onConfirm(toAdd);
  };

  return (
    <Modal title="Sélectionner des exercices IA" onClose={onClose}>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {availableExercises.map((exo) => (
          <div
            key={exo.id}
            className={`p-3 border rounded cursor-pointer hover:bg-gray-50 flex justify-between items-center ${selected.includes(exo.id) ? 'bg-blue-50 border-blue-300' : ''}`}
            onClick={() => toggleSelect(exo.id)}
          >
            <div>
              <p className="font-medium text-sm">{exo.name}</p>
              <p className="text-xs text-gray-500">{exo.description}</p>
              <p className="text-xs text-gray-400 mt-1">{exo.duration_min} min</p>
            </div>
            <input type="checkbox" checked={selected.includes(exo.id)} readOnly />
          </div>
        ))}
      </div>
      <button
        onClick={handleAdd}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
        disabled={selected.length === 0}
      >
        Ajouter {selected.length} exercice{selected.length > 1 ? 's' : ''} à la séance
      </button>
    </Modal>
  );
} 