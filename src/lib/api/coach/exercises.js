import { exercises }  from "@/lib/mocks/exercises";

/**
 * Simule un appel réseau avec délai.
 */
function simulateNetworkDelay(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), 300));
}

/**
 * ✅ Récupère tous les exercices.
 */
export async function fetchAllExercises() {
  return simulateNetworkDelay(exercises);
}

/**
 * 🔍 Récupère un exercice par ID.
 * @param {string} exerciseId
 */
export async function fetchExerciseById(exerciseId) {
  const found = exercises.find((e) => e.id === exerciseId);
  if (!found) throw new Error("Exercice introuvable");
  return simulateNetworkDelay(found);
}
