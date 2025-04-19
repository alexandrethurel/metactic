// lib/api/coach/trainings.js

import { trainings } from "@/lib/mocks/trainings";

/**
 * Simule la création d'un entraînement et retourne son ID (toujours training-5 ici)
 */
export async function createTraining(trainingData) {
  return "training-5";
}

/**
 * Récupère un entraînement par son ID
 */
export async function getTrainingById(id) {
  return trainings.find((t) => t.id === id);
}
