// src/lib/mock/matches.js

/**
 * Exemple de matches avec :
 *  - club_id             : l’ID du club qui organise le match
 *  - opponent             : nom de l’équipe adverse
 *  - formation_id         : référence à une entrée dans `formations`
 *  - assignments          : dictionnaire formation_position_id → player_id
 *  - goals_for            : nombre de buts marqués
 *  - goals_against        : nombre de buts encaissés
 *  - is_done              : true si le match est terminé
 *  - available_player_ids : liste des IDs des joueurs disponibles
 *  - invited_player_ids   : liste des IDs des joueurs invités
 */
export const matches = [
    {
      id: "match-1",
      club_id: "0",
      date: "2025-04-26T18:00:00Z",
      location: "Stade Marcel Guillot",
      opponent: "FC Pays du Neubourg",
      formation_id: "f1", // "4-3-3 Classique"
      assignments: {
        // formation_position_id : player_id
        fp1:  "p20", // Gardien
        fp2:  "p2",  // Défenseur gauche
        fp3:  "p3",  // Défenseur central gauche
        fp4:  "p4",  // Défenseur central droit
        fp5:  "p5",  // Défenseur droit
        fp6:  "p6",  // Milieu défensif gauche
        fp7:  "p7",  // Milieu défensif droit
        fp8:  "p8",  // Milieu offensif gauche
        fp9:  "p9",  // Milieu offensif centre
        fp10: "p10", // Milieu offensif droit
        fp11: "p11"  // Attaquant
      },
      goals_for: null,
      goals_against: null,
      is_done: false,
      available_player_ids: [
        "p4","p5","p6","p7","p8","p9","p10","p11",
        "p12","p13","p14","p15","p16","p17","p18","p19","p20"
      ],
      self : "/coach/matches/preparation/match-1"
    },
    {
      id: "match-2",
      club_id: "0",
      date: "2025-04-10T18:00:00Z",
      location: "Stade Helios Guijarro",
      opponent: "Jacou Clapiers FA",
      formation_id: "f2",
      assignments: {
        fp1:  "p20", // Gardien
        fp2:  "p2",  // Défenseur gauche
        fp3:  "p3",  // Défenseur central gauche
        fp4:  "p4",  // Défenseur central droit
        fp5:  "p5",  // Défenseur droit
        fp6:  "p6",  // Milieu défensif gauche
        fp7:  "p7",  // Milieu défensif droit
        fp8:  "p8",  // Milieu offensif gauche
        fp9:  "p9",  // Milieu offensif centre
        fp10: "p10", // Milieu offensif droit
        fp11: "p11"  // Attaquant
      },
      goals_for: 1,
      goals_against: 2,
      is_done: true,
      available_player_ids: [
        "p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11",
        "p12","p13","p14","p15","p16","p17","p18","p19","p20"
      ],
      self : "/coach/matches/preparation/match-2"
    },
    {
      id: "match-3",
      club_id: "0",
      date: "2025-04-01T18:00:00Z",
      location: "Stade Louis Combettes",
      opponent: "A.S Celleneuve",
      formation_id: "f2", 
      assignments: {
        fp1:  "p20", // Gardien
        fp2:  "p2",  // Défenseur gauche
        fp3:  "p3",  // Défenseur central gauche
        fp4:  "p4",  // Défenseur central droit
        fp5:  "p5",  // Défenseur droit
        fp6:  "p6",  // Milieu défensif gauche
        fp7:  "p7",  // Milieu défensif droit
        fp8:  "p8",  // Milieu offensif gauche
        fp9:  "p9",  // Milieu offensif centre
        fp10: "p10", // Milieu offensif droit
        fp11: "p11"  // Attaquant
      },
      goals_for: 3,
      goals_against: 0,
      is_done: true,
      available_player_ids: [
        "p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11",
        "p12","p13","p14","p15","p16","p17","p18","p19","p20"
      ],
      self : "/coach/matches/preparation/match-3"
    }
  ];
  