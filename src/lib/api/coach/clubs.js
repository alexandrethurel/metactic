import clubs from "@/lib/mocks/clubs";

/**
 * ⏱ Simule un délai réseau
 */
function simulateNetworkDelay(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), 300));
}

/**
 * ✅ Récupère tous les clubs
 */
export async function fetchAllClubs() {
  return simulateNetworkDelay(clubs);
}

/**
 * 🔍 Récupère un club par ID
 * @param {string} clubId
 */
export async function fetchClubById(clubId) {
  const club = clubs.find((c) => c.id === clubId);
  if (!club) throw new Error("Club introuvable");
  return simulateNetworkDelay(club);
}
