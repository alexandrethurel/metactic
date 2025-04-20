"use client";

import { FileDown } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import DatePickerTile from "@/components/coach/trainings/preparation/DatePickerTile";
import TypeSelectTile from "@/components/coach/trainings/preparation/TypeSelectTile";
import LocationTile from "@/components/coach/trainings/preparation/LocationTile";
import TrainingContentTile from "@/components/coach/trainings/preparation/TrainingContentTile";
import WeatherTile from "@/components/coach/trainings/preparation/WeatherTile";
import PlayersTile from "@/components/coach/trainings/preparation/PlayersTile";

import { getTrainingById } from "@/lib/api/coach/trainings";
import { fetchExerciseById } from "@/lib/api/coach/exercises";

const mockWeather = {
  temperature: "17°C",
  condition: "☀️ Ensoleillé",
  location: "Stade Municipal",
};

const iaThemes = [
  "Conduite de balle", "Contrôle et passes", "Dribble et élimination", "Finition",
  "Jeu de tête", "Conservation du ballon", "Transitions offensives/défensives",
  "Utilisation de la largeur", "Jeu entre les lignes", "Pressing et contre-pressing",
  "Endurance aérobie", "Vitesse et explosivité", "Agilité et coordination",
  "Force et duels", "Récupération active", "Fixation et décalage",
  "Jeu en infériorité/majorité numérique", "Gestion du temps de jeu",
  "Déclenchement des appels", "Jeu sous pression",
].map((label) => ({ value: label, label }));

export default function TrainingPreparationPage() {
  const { id_training } = useParams();

  const [training, setTraining] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [trainingDate, setTrainingDate] = useState(new Date());
  const [location, setLocation] = useState("Extérieur");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [exercises, setExercises] = useState([]);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [hasInvitedPlayers, setHasInvitedPlayers] = useState(false);

  useEffect(() => {
    if (!id_training) return;

    const fetchData = async () => {
      const data = await getTrainingById(id_training);
      setTraining(data);

      if (data) {
        setTrainingDate(new Date(data.date));
        setLocation(data.location);
        setSelectedTypes(data.tags.map((t) => ({ value: t, label: t })));

        const resolvedExercises = await Promise.all(
          data.exercises.map(async (id) => {
            try {
              return await fetchExerciseById(id);
            } catch (err) {
              console.warn(`Exercice "${id}" introuvable.`);
              return null;
            }
          })
        );

        setExercises(resolvedExercises.filter(Boolean));
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id_training]);

  const handleDelete = (id) => {
    setExercises(exercises.filter((e) => e.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...exercises];
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setExercises(reordered);
  };

  const handleAddExercise = ({ name, description, duration_min }) => {
    if (name.trim()) {
      setExercises([
        ...exercises,
        { id: `new-${Date.now()}`, name, description, duration_min },
      ]);
      setShowAddExerciseModal(false);
    }
  };

  if (isLoading) return <p className="p-6">Chargement...</p>;
  if (!training) return <p className="p-6 text-red-600">Entraînement introuvable.</p>;

  return (
    <div className="min-h-screen bg-gray-100 text-[#0B1231] p-6">
      <h2 className="text-xl font-bold mb-4">Paramètres de la séance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DatePickerTile
          trainingDate={trainingDate}
          setTrainingDate={setTrainingDate}
        />
        <TypeSelectTile
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          iaThemes={iaThemes}
        />
        <LocationTile
          location={location}
          setLocation={setLocation}
        />
      </div>

      <h2 className="text-xl font-bold mb-4">Contenu de la séance</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TrainingContentTile
          exercises={exercises}
          setExercises={setExercises}
          selectedTypes={selectedTypes}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          showAddExerciseModal={showAddExerciseModal}
          setShowAddExerciseModal={setShowAddExerciseModal}
          handleDelete={handleDelete}
          handleDragEnd={handleDragEnd}
          handleAddExercise={handleAddExercise}
        />

        <WeatherTile weather={mockWeather} />

        <PlayersTile
          hasInvitedPlayers={hasInvitedPlayers}
          setHasInvitedPlayers={setHasInvitedPlayers}
          showInviteModal={showInviteModal}
          setShowInviteModal={setShowInviteModal}
        />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => alert("Fonction d'export PDF en cours de développement.")}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 text-sm flex items-center gap-2"
        >
          <FileDown className="w-4 h-4" /> Exporter PDF
        </button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm">
          ✅ Valider la séance
        </button>
      </div>
    </div>
  );
}
