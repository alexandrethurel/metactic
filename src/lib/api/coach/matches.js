// lib/api/coach/matches.js
import { matches } from "@/lib/mocks/matches";

/**
 * Récupère un match par son ID.
 * @param {string} id_match - L'identifiant du match.
 * @returns {object|null} Le match trouvé ou null.
 */
export function getMatchById(id_match) {
  return matches.find((m) => m.id === id_match) || null;
}

/**
 * Retourne tous les matchs.
 * @returns {Array<object>} Liste des matchs.
 */
export function getAllMatches() {
  return matches;
}
