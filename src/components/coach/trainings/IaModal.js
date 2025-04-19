// components/coach/IaModal.jsx
import Modal from "../ui/Modal";

export default function IaModal({ selected, onSelect, onAdd, onClose, options }) {
  return (
    <Modal title="Objectif principal" onClose={onClose}>
      <select
        value={selected.value}
        onChange={(e) => {
          const selectedObj = options.find((opt) => opt.value === e.target.value);
          onSelect(selectedObj);
        }}
        className="w-full border px-3 py-2 rounded text-sm mb-4"
      >
        {options.map((theme) => (
          <option key={theme.value} value={theme.value} className="text-black">
            {theme.label}
          </option>
        ))}
      </select>
      <button
        onClick={onAdd}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
      >
        Ajouter à la séance
      </button>
    </Modal>
  );
}