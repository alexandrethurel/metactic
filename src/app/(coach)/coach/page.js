"use client";

import React, { useState } from "react";

export default function CoachDashboardPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bienvenue, Coach !</h1>
        <p className="text-gray-600">Voici un aperçu de votre club aujourd'hui.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Statistiques clés */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-xl font-semibold mb-2">Effectif</h2>
          <p className="text-4xl font-bold">18</p>
          <p className="text-sm text-gray-500">joueurs disponibles</p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-xl font-semibold mb-2">Prochain entraînement</h2>
          <p className="text-lg font-medium">Jeudi 20 avril - 18h30</p>
          <p className="text-sm text-gray-500">Stade municipal</p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <p className="text-4xl font-bold">4</p>
          <p className="text-sm text-gray-500">non lus</p>
        </div>

        {/* Liste des derniers entraînements */}
        <div className="bg-white rounded-lg shadow p-5 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Derniers entraînements</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-2 flex justify-between">
              <span>17 avril - Endurance et vitesse</span>
              <span className="text-sm text-green-600">✓ Complet</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>15 avril - Tactique 4-3-3</span>
              <span className="text-sm text-green-600">✓ Complet</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>12 avril - Jeu de position</span>
              <span className="text-sm text-yellow-500">⚠ 2 absents</span>
            </li>
          </ul>
        </div>

        {/* Bloc suggestion IA */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Suggestion IA</h2>
          <p className="text-sm mb-2">💡 Basé sur la forme actuelle, pensez à travailler le pressing haut.</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-2 text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Générer une séance adaptée
          </button>
        </div>
      </div>

      {showModal && <AiSessionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
