"use client";

import { useState } from "react";
import Modal from "@/components/coach/ui/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { CalendarDays, Sparkles } from "lucide-react";
import { createTraining } from "@/lib/api/coach/trainings";

import { useRouter } from "next/navigation";

const iaThemes = [
  "Conduite de balle", "Contrôle et passes", "Dribble et élimination", "Finition",
  "Jeu de tête", "Conservation du ballon", "Transitions offensives/défensives",
  "Utilisation de la largeur", "Jeu entre les lignes", "Pressing et contre-pressing",
  "Endurance aérobie", "Vitesse et explosivité", "Agilité et coordination",
  "Force et duels", "Récupération active", "Fixation et décalage",
  "Jeu en infériorité/majorité numérique", "Gestion du temps de jeu",
  "Déclenchement des appels", "Jeu sous pression",
].map((label) => ({ label, value: label }));

export default function PlanSessionModal({ onClose, onConfirm }) {

    const router = useRouter();
    const getNextWednesdayAt20h = () => {
    const now = new Date();
    const nextWednesday = new Date();
    const day = now.getDay();
    const diff = (3 + 7 - day) % 7 || 7; // mercredi = 3
    nextWednesday.setDate(now.getDate() + diff);
    nextWednesday.setHours(20, 0, 0, 0);
    return nextWednesday;
  };

  const handleConfirm = async () => {
    // simulate la création avec les infos par défaut (tu peux améliorer plus tard)
    const newTrainingId = await createTraining({
        date: dateTime.toISOString().split("T")[0],
        title: "Séance personnalisée",
        tags: types.map((t) => t.value),     
        location                            
      });

    onClose();
    router.push(`/coach/trainings/preparation/${newTrainingId}`);
  };

  const [dateTime, setDateTime] = useState(getNextWednesdayAt20h());
  const [types, setTypes] = useState([]);
  const [location, setLocation] = useState("Extérieur");
  const [useAiGeneration, setUseAiGeneration] = useState(true);

  const formattedDate = dateTime.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Modal title="Programmer une séance" onClose={onClose}>
      <div className="space-y-4">
        {/* Date & heure */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date & heure</label>
          <div className="relative">
            <DatePicker
              selected={dateTime}
              onChange={(date) => setDateTime(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <CalendarDays className="absolute right-3 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {formattedDate} à {formattedTime}
          </p>
        </div>

        {/* Type(s) de séance */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4" /> Type(s) de séance
          </label>
          <Select
            options={iaThemes}
            value={types}
            onChange={setTypes}
            isMulti
            placeholder="Choisir les objectifs..."
            className="text-sm"
            classNamePrefix="select"
            closeMenuOnSelect={false}
          />
        </div>

        {/* Lieu */}
        <div>
          <label className="text-sm font-medium mb-1 block">Lieu</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
          >
            <option>Extérieur</option>
            <option>Intérieur</option>
          </select>
        </div>
        <div className="flex items-center gap-2 text-sm">
            <input
                type="checkbox"
                id="ai-generation"
                checked={useAiGeneration}
                onChange={(e) => setUseAiGeneration(e.target.checked)}
                className="accent-green-600"
            />
            <label htmlFor="ai-generation" className="text-sm text-gray-700">
                Générer automatiquement avec l’IA
            </label>
        </div>

        {/* Bouton */}
        <button
            onClick={handleConfirm}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
            >
            Valider et passer à la préparation
        </button>
      </div>
    </Modal>
  );
}
