// lib/mocks/trainings.js

export const trainings = [
  {
    id: "training-1",
    club_id: "e12a35c3-a6b9-4b65-a519-5fdf9e13a23c",
    generation_id: "gen-1",
    date: "2025-04-20",
    title: "Séance pressing & endurance",
    exercises: [],
    location : "Extérieur",
    generated_by_ai: true,
    is_favorite: false,
    created_at: "2025-04-18T10:15:00Z",
    updated_at: "2025-04-18T10:15:00Z",
    tags: []
  },
  {
    id: "training-2",
    club_id: "e12a35c3-a6b9-4b65-a519-5fdf9e13a23c",
    generation_id: null,
    date: "2025-04-12",
    title: "Séance technique du samedi",
    exercises: ["e4", "e5", "e6"],
    generated_by_ai: false,
    is_favorite: true,
    created_at: "2025-04-12T09:00:00Z",
    updated_at: "2025-04-12T09:00:00Z"
  },
  {
    id: "training-3",
    club_id: "e12a35c3-a6b9-4b65-a519-5fdf9e13a23c",
    generation_id: null,
    date: "2025-04-10",
    title: "Préparation match dimanche",
    exercises: ["e3", "e8", "e9"],
    generated_by_ai: false,
    is_favorite: false,
    created_at: "2025-04-09T15:45:00Z",
    updated_at: "2025-04-09T15:45:00Z"
  },
  {
    id: "training-4",
    club_id: "e12a35c3-a6b9-4b65-a519-5fdf9e13a23c",
    generation_id: "gen-3",
    date: "2025-04-08",
    title: "Séance jeu de position",
    exercises: ["e10", "e11"],
    generated_by_ai: true,
    is_favorite: false,
    created_at: "2025-04-08T08:30:00Z",
    updated_at: "2025-04-08T08:30:00Z"
  },
  {
    id: "training-5",
    club_id: "0",
    generation_id: "gen-3",
    date: "2025-04-08",
    title: "Séance complète : échauffement, conservation, récupération",
    exercises: [
      "e-warmup-1", 
      "e-warmup-2", 
      "e-possession-1",
      "e-possession-2", 
      "t1",
      "t2",
      "e-cooldown-1", 
      "e-cooldown-2" 
    ],
    location : "Extérieur",
    tags: ["Conservation du ballon"],
    generated_by_ai: true,
    is_favorite: false,
    created_at: "2025-04-08T08:30:00Z",
    updated_at: "2025-04-08T08:30:00Z"
  },
  {
    id: "training-6",
    club_id: "0",
    generation_id: "gen-3",
    date: "2025-04-06",
    title: "Séance complète : échauffement, conservation, récupération",
    exercises: [
      "e-warmup-1", 
      "e-warmup-2", 
      "e-possession-1",
      "e-possession-2", 
      "t1",
      "t2",
      "e-cooldown-1", 
      "e-cooldown-2" 
    ],
    location : "Extérieur",
    tags: ["Conservation du ballon"],
    generated_by_ai: true,
    is_favorite: false,
    created_at: "2025-04-08T08:30:00Z",
    updated_at: "2025-04-08T08:30:00Z"
  },
  {
    id: "training-7",
    club_id: "0",
    generation_id: "gen-3",
    date: "2025-03-27",
    title: "Séance complète : échauffement, conservation, récupération",
    exercises: [
      "e-warmup-1", 
      "e-warmup-2", 
      "e-possession-1",
      "e-possession-2", 
      "t1",
      "t2",
      "e-cooldown-1", 
      "e-cooldown-2" 
    ],
    location : "Extérieur",
    tags: ["Conservation du ballon"],
    generated_by_ai: true,
    is_favorite: false,
    created_at: "2025-04-08T08:30:00Z",
    updated_at: "2025-04-08T08:30:00Z"
  }
  
];

export default trainings;
