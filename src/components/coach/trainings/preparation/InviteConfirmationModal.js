import Modal from "@/components/coach/ui/Modal";

export default function InviteConfirmationModal({ onConfirm, onClose }) {
  return (
    <Modal title="Envoyer une invitation ?" onClose={onClose}>
      <p className="text-sm text-gray-700">
        Tous les joueurs vont recevoir une invitation pour cette séance.
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded"
        >
          Confirmer
        </button>
      </div>
    </Modal>
  );
}
