import { players } from "@/lib/mocks/players";
import { users } from "@/lib/mocks/users";
console.log("DEBUG players loaded:", players);
console.log("DEBUG users loaded:", users);
// Simule un délai réseau
function simulateNetworkDelay(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), 300));
}

/**
 * ✅ Récupère tous les players disponibles
 */
export async function fetchAvailablePlayers() {
  const availablePlayers = players.filter((u) => u.is_available);
  return simulateNetworkDelay(availablePlayers);
}

/**
 * 🔍 Récupère un player par ID
 * @param {string} id
 */
export async function getPlayerById(id) {
  const player = players.find((u) => u.id === id);
  if (!player) throw new Error("Player introuvable");
  return simulateNetworkDelay(player);
}

/**
 * 🔁 Fusionne les infos players + users
 */
export async function fetchAvailablePlayersWithUserInfo() {
  const enriched = players
    .filter((p) => p.is_available)
    .map((player) => {
      const user = users.find((u) => u.id === player.user_id);
      return {
        ...player,
        first_name: user?.first_name ?? "Inconnu",
        last_name: user?.last_name ?? "Inconnu",
        avatar_url: user?.avatar_url ?? null,
      };
    });

  return simulateNetworkDelay(enriched);
}

/**
 * 🔁 Change la disponibilité d’un player
 * @param {string} id
 * @param {boolean} newAvailability
 */
export async function updatePlayerAvailability(id, newAvailability) {
  const index = players.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("Player introuvable");

  players[index].is_active = newAvailability;
  players[index].updated_at = new Date().toISOString();

  return simulateNetworkDelay(players[index]);
}
