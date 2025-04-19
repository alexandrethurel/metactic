export default function InviteConfirmationStep({ onConfirm }) {
    return (
      <div className="text-center space-y-4">
        <p className="text-sm text-gray-600">
          Une invitation sera envoyée aux joueurs disponibles.
        </p>
        <button
          onClick={onConfirm}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Continuer
        </button>
      </div>
    );
  }