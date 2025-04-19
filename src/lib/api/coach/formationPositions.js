import formationPositions from "@/lib/mocks/formationPositions";

/**
 * Simule un appel réseau avec délai.
 */
function simulateNetworkDelay(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), 300));
}

/**
 * ✅ Récupère toutes les positions d'une formation.
 * @param {string} formationId
 */
export async function getFormationPositionsByFormationId(formationId) {
  const positions = formationPositions.filter(fp => fp.formation_id === formationId);
  return simulateNetworkDelay(positions);
}

/**
 * 🔍 Récupère une position spécifique par son ID.
 * @param {string} positionId
 */
export async function getFormationPositionById(positionId) {
  const pos = formationPositions.find(fp => fp.id === positionId);
  if (!pos) throw new Error("Position introuvable");
  return simulateNetworkDelay(pos);
}

/**
 * 🔁 Met à jour les coefficients d’une position donnée.
 * @param {string} positionId
 * @param {object} updatedCoefficients - Ex: { passing_coef: 0.6, stamina_coef: 0.9 }
 */
export async function updateFormationPositionCoefficients(positionId, updatedCoefficients) {
  const index = formationPositions.findIndex(fp => fp.id === positionId);
  if (index === -1) throw new Error("Position introuvable");

  formationPositions[index] = {
    ...formationPositions[index],
    ...updatedCoefficients,
    updated_at: new Date().toISOString(),
  };

  return simulateNetworkDelay(formationPositions[index]);
}
