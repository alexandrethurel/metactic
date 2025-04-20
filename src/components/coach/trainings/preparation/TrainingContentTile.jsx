import { Plus, Sparkles } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import dynamic from "next/dynamic";
import ExerciseCard from "./ExerciseCard";

// Imports dynamiques des modals
const ExercisePickerModal = dynamic(
  () => import("./ExercisePickerModal"),
  {
    ssr: false,
    loading: () => <p className="text-sm text-gray-500">Chargement du générateur IA…</p>,
  }
);

const AddExerciseModal = dynamic(
  () => import("./AddExerciseModal"),
  {
    ssr: false,
    loading: () => <p className="text-sm text-gray-500">Chargement du formulaire…</p>,
  }
);

export default function TrainingContentTile({
  exercises,
  setExercises,
  selectedTypes,
  showPicker,
  setShowPicker,
  showAddExerciseModal,
  setShowAddExerciseModal,
  handleDelete,
  handleDragEnd,
  handleAddExercise,
}) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col gap-4 min-h-[300px]">
      <h3 className="font-semibold flex items-center gap-2">📝 Séance du jour</h3>

      <div className="flex gap-2">
        <button
          onClick={() => setShowPicker(true)}
          disabled={selectedTypes.length === 0}
          className={`flex-1 py-2 px-4 rounded text-sm flex items-center justify-center gap-2 transition
            ${selectedTypes.length === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"}`}
        >
          {selectedTypes.length === 0
            ? "🔒 Proposer des exercices"
            : <>
                <Sparkles className="w-4 h-4" /> Proposer des exercices
              </>
          }
        </button>

        <button
          onClick={() => setShowAddExerciseModal(true)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Ajouter un exercice
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="exerciseList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
              {exercises.length === 0 && (
                <div className="text-sm text-gray-500 italic text-center py-4">
                  Aucun exercice pour le moment.
                </div>
              )}
              {exercises.map((exercise, index) => (
                <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ExerciseCard exercise={exercise} onDelete={handleDelete} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {exercises.length > 0 && (
        <p className="text-right text-sm text-gray-600 pt-2">
          Durée totale : {exercises.reduce((sum, e) => sum + Number(e.duration_min || 0), 0)} min
        </p>
      )}

      {showPicker && (
        <ExercisePickerModal
          selectedTypes={selectedTypes}
          onConfirm={(chosen) => {
            setExercises([...exercises, ...chosen]);
            setShowPicker(false);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}

      {showAddExerciseModal && (
        <AddExerciseModal
          onAdd={handleAddExercise}
          onClose={() => setShowAddExerciseModal(false)}
        />
      )}
    </div>
  );
}
