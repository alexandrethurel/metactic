"use client";

import {
  Sparkles,
  CalendarDays,
  FileDown,
  MapPin,
  Plus,
  Users,
  CloudSun,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ExerciseCard from "@/components/coach/trainings/preparation/ExerciseCard";
import AddExerciseModal from "@/components/coach/trainings/preparation/AddExerciseModal";
import ExercisePickerModal from "@/components/coach/trainings/preparation/ExercisePickerModal";
import InviteConfirmationModal from "@/components/coach/trainings/preparation/InviteConfirmationModal";
import AvailablePlayersList from "@/components/coach/trainings/preparation/AvailablePlayersList";
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
    const reordered = Array.from(exercises);
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
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <CalendarDays className="w-4 h-4" /> Date & Heure
          </h3>
          <DatePicker
            selected={trainingDate}
            onChange={setTrainingDate}
            showTimeSelect
            dateFormat="Pp"
            timeFormat="HH:mm"
            timeIntervals={15}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4" /> Type(s) de séance
          </h3>
          <Select
            options={iaThemes}
            value={selectedTypes}
            onChange={setSelectedTypes}
            isMulti
            placeholder="Choisir les objectifs..."
            className="text-sm"
            classNamePrefix="select"
            closeMenuOnSelect={false}
          />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4" /> Lieu d'entraînement
          </h3>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          >
            <option>Extérieur</option>
            <option>Intérieur</option>
          </select>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Contenu de la séance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow flex flex-col gap-4 min-h-[300px]">
          <h3 className="font-semibold flex items-center gap-2">📝 Séance du jour</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPicker(true)}
              disabled={selectedTypes.length === 0}
              className={`flex-1 py-2 px-4 rounded text-sm flex items-center justify-center gap-2 transition
                ${selectedTypes.length === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"}`}
            >
              {selectedTypes.length === 0 ? "🔒 Proposer des exercices" : <><Sparkles className="w-4 h-4" /> Proposer des exercices</>}
            </button>
            <button
              onClick={() => setShowAddExerciseModal(true)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Ajouter un exercice
            </button>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="exerciseList">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                  {exercises.length === 0 && (
                    <div className="text-sm text-gray-500 italic text-center py-4">
                      Aucun exercice pour le moment.
                    </div>
                  )}
                  {exercises.map((exercise, index) => (
                    <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ExerciseCard exercise={exercise} onDelete={handleDelete} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {exercises.length > 0 && (
            <p className="text-right text-sm text-gray-600 pt-2">
              Durée totale : {exercises.reduce((sum, e) => sum + Number(e.duration_min || 0), 0)} min
            </p>
          )}
          {showPicker && (
            <ExercisePickerModal
              selectedTypes={selectedTypes}
              onConfirm={(chosen) => {
                setExercises([...exercises, ...chosen]);
                setShowPicker(false);
              }}
              onClose={() => setShowPicker(false)}
            />
          )}
        </div>

        <div className="bg-white p-4 rounded shadow min-h-[300px]">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <CloudSun className="w-4 h-4" /> Météo prévue
          </h3>
          <p><strong>Lieu :</strong> {mockWeather.location}</p>
          <p><strong>Conditions :</strong> {mockWeather.condition}</p>
          <p><strong>Température :</strong> {mockWeather.temperature}</p>
        </div>

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

      {showAddExerciseModal && (
        <AddExerciseModal
          onAdd={handleAddExercise}
          onClose={() => setShowAddExerciseModal(false)}
        />
      )}
    </div>
  );
}
