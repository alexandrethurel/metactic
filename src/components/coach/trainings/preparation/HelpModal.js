// components/coach/HelpModal.jsx
import Modal from "../../ui/Modal";

export default function HelpModal({ onClose }) {
  return (
    <Modal title="Exemple d'exercice" onClose={onClose}>
      <p className="text-sm text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod purus eu risus eleifend.
      </p>
    </Modal>
  );
}
