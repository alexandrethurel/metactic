"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus } from "lucide-react";
import { createTraining } from "@/lib/api/coach/trainings";
import PlanSessionModal from "./PlanSessionModal";

export default function NextTrainingTile() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const training = null; // mettez à null s'il n'y a pas de séance prévue

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-2">Prochain entraînement</h2>

      {training ? (
        <>
          <p className="text-lg font-medium">
            {training.date} - {training.hour}
          </p>
          <p className="text-sm text-gray-300">{training.location}</p>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-300 mb-3">
            Pas de prochain entraînement programmé
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center gap-2"
          >
            <CalendarPlus size={16} /> Préparer une séance
          </button>
        </>
      )}

      {showModal && (
        <PlanSessionModal
          onClose={() => setShowModal(false)}
          onConfirm={async (trainingData) => {
            const trainingId = await createTraining(trainingData);
            setShowModal(false);
            router.push("/coach/trainings/preparation"); // ou dynamique avec trainingId
          }}
        />
      )}
    </div>
  );
}
