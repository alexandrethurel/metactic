"use client";

import { useState } from "react";
import TeamTile from "@/components/coach/home/TeamTile";
import NextTrainingTile from "@/components/coach/home/NextTrainingTile";
import NextMatchTile from "@/components/coach/home/NextMatchTile";
import LastTrainingsTile from "@/components/coach/home/RecentActivityTile";
import AiSuggestionTile from "@/components/coach/home/AiSuggestionTile";
import RankingTile from "@/components/coach/home/RankingTile";

export default function CoachDashboardPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-[#0B1231] p-6">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Bienvenue, Coach !</h1>
        <p className="text-gray-600">Voici un aperçu de votre équipe à ce jour.</p>
      </div>

      {/* Disposition principale : 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche : 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NextMatchTile />
            <NextTrainingTile />
          </div>

          <LastTrainingsTile />
        </div>

        {/* Colonne droite : 1/3 */}
        <div className="space-y-6">
          <AiSuggestionTile onOpenModal={() => setShowModal(true)} />
          <RankingTile />
        </div>
      </div>

      {showModal && <AiSessionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
