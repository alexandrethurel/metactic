import Modal from "@/components/coach/ui/Modal";
import { useState, useEffect } from "react";
import InviteConfirmationStep from "./InviteConfirmationStep";
import AvailablePlayersList from "./AvailablePlayersList";
import { fetchAvailablePlayers } from "@/lib/api/coach/players";

export default function InvitePlayersModal({ onClose }) {
  const [step, setStep] = useState("confirm"); // "confirm" | "select"
  const [players, setPlayers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (step === "select") {
      fetchAvailablePlayers().then(setPlayers);
    }
  }, [step]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <Modal title="Inviter les joueurs" onClose={onClose}>
      {step === "confirm" ? (
        <InviteConfirmationStep onConfirm={() => setStep("select")} />
      ) : (
        <AvailablePlayersList
          players={players}
          selectedIds={selectedIds}
          onToggle={toggleSelect}
          onSend={() => {
            alert(`Invitations envoyées à ${selectedIds.length} joueur(s)`);
            onClose();
          }}
        />
      )}
    </Modal>
  );
}
