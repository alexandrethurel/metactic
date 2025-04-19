// components/coach/trainings/AddExerciseModal.jsx
import { useState } from "react";
import Modal from "../ui/Modal";

export default function AddExerciseModal({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      onAdd({ name, description, duration_min });
      setTitle("");
      setDescription("");
      setDuration("");
    }
  };

  return (
    <Modal title="Nouvel exercice" onClose={onClose}>
      <input
        type="text"
        placeholder="Titre de l'exercice"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm mb-3"
      />
      <textarea
        placeholder="Objectif de l'exercice"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm mb-3"
        rows={3}
      />
      <input
        type="number"
        placeholder="Durée (min)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm mb-4"
      />
      <button
        onClick={handleAdd}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
      >
        Ajouter à la séance
      </button>
    </Modal>
  );
}
