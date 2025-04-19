// components/coach/trainings/ExerciseCard.jsx
import { GripVertical, Trash2 } from "lucide-react";

export default function ExerciseCard({ exercise, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-md p-4 mb-2 flex justify-between items-center transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <div className="text-gray-600 cursor-grab">
          <GripVertical size={24} />
        </div>

        <div>
          <h3 className="font-semibold text-sm">{exercise.name}</h3>
          <p className="text-xs text-gray-500">{exercise.description}</p>
          {exercise.duration_min && (
            <p className="text-xs text-gray-400 mt-1">Durée : {exercise.duration_min} min</p>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(exercise.id)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
