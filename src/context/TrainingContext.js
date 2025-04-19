"use client";

import { createContext, useContext, useState } from "react";

const TrainingContext = createContext();

export function TrainingProvider({ children }) {
  const [currentTraining, setCurrentTraining] = useState(null);

  return (
    <TrainingContext.Provider value={{ currentTraining, setCurrentTraining }}>
      {children}
    </TrainingContext.Provider>
  );
}

export function useTraining() {
  return useContext(TrainingContext);
}
