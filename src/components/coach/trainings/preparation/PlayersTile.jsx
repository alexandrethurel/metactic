import { Users } from "lucide-react";
import dynamic from "next/dynamic";
import AvailablePlayersList from "./AvailablePlayersList";

// Chargement dynamique du modal
const InviteConfirmationModal = dynamic(
  () => import("./InviteConfirmationModal"),
  {
    ssr: false,
    loading: () => <p className="text-sm text-gray-500">Chargement de la fenêtre...</p>,
  }
);

export default function PlayersTile({
  hasInvitedPlayers,
  setHasInvitedPlayers,
  showInviteModal,
  setShowInviteModal,
}) {
  return (
    <div className="bg-white p-4 rounded shadow min-h-[300px]">
      <h3 className="font-semibold flex items-center gap-2 mb-2">
        <Users className="w-4 h-4" /> Joueurs
      </h3>

      {!hasInvitedPlayers ? (
        <p
          className="text-center text-blue-600 hover:underline cursor-pointer"
          onClick={() => setShowInviteModal(true)}
        >
          Inviter les joueurs
        </p>
      ) : (
        <AvailablePlayersList />
      )}

      {showInviteModal && (
        <InviteConfirmationModal
          onClose={() => setShowInviteModal(false)}
          onConfirm={() => {
            setShowInviteModal(false);
            setHasInvitedPlayers(true);
          }}
        />
      )}
    </div>
  );
}
