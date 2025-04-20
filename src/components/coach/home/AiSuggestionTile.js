// components/coach/trainings/preparation/AnalyseIaTile.jsx
"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnalyseIaTile() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setIsAnalyzing(true);
    // simulate IA delay
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Tile principale */}
      <motion.div
        onClick={openModal}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl p-6 flex flex-col items-start gap-4 cursor-pointer"
      >
        <h2 className="text-2xl font-bold text-white subtle-glow">
          Suggestion IA
        </h2>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16,185,129,0.8)" }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden px-5 py-3 bg-green-600 text-white font-medium rounded-full flex items-center gap-2 before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-400 before:to-green-800 before:opacity-30 before:blur-lg"
        >
          <Sparkles className="w-5 h-5 animate-spin-slow" />
          Lancer l'analyse
        </motion.div>
      </motion.div>

      {/* Pop‑in modale */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-transparent backdrop-blur-xl flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative neon-border rounded-2xl p-8 max-w-xl w-full text-white bg-black/70 border border-white/20 overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Croix de fermeture */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {isAnalyzing ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-48"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-lg subtle-glow">
                    Analyse en cours...
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Titre du rapport */}
                  <motion.h3
                    className="text-2xl font-bold mb-4 subtle-glow"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Rapport via IA — Metactic
                  </motion.h3>

                  {/* Statistiques */}
                  <ul className="space-y-3 mb-6 text-sm">
                    {[
                      ["📊 Passes réussies", "82% (164/200)"],
                      ["🤺 Duels gagnés", "59% (142/240)"],
                      ["🥅 Tirs cadrés", "3.8 par match"],
                      ["⏱️ Possession Mi‑Tps 1", "48%"],
                      ["⏱️ Possession Mi‑Tps 2", "54%"],
                      ["⚽ Efficacité CPA", "22% (corners)"],
                      ["📍 Zones d'action", "45% en axe médian"],
                      ["🏃 Distance moyenne", "9.7 km/joueur"],
                      ["🛡️ Interceptions", "12 par match"],
                      ["🩹 RPE moyen", "6.8/10"],
                      ["📅 Taux de présence", "92%"],
                    ].map(([label, value], i) => (
                      <motion.li
                        key={i}
                        className="flex justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <span>{label}</span>
                        <span className="font-semibold">{value}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Recommandations */}
                  <motion.div
                    className="bg-gray-800 bg-opacity-50 p-4 rounded-lg text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <h4 className="font-semibold mb-2">🔮 Recommandations</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Accentuer le pressing en 2e mi‑temps.</li>
                      <li>Travailler les CPA pour dépasser 30% d'efficacité.</li>
                      <li>Renforcer la rotation de passes en zone offensive.</li>
                      <li>Adapter le conditionnement pour baisser le RPE sous 6.</li>
                    </ul>
                  </motion.div>

                  {/* Bouton Fermer */}
                  <motion.button
                    onClick={closeModal}
                    whileHover={{ scale: 1.05 }}
                    className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full font-medium text-sm"
                  >
                    Fermer
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles additionnels */}
      <style jsx>{`
        .subtle-glow {
          text-shadow: 0 0 2px #10b981, 0 0 4px #10b981;
        }
        .neon-border {
          box-shadow:
            0 0 8px rgba(16, 185, 129, 0.7),
            0 0 16px rgba(16, 185, 129, 0.5),
            0 0 24px rgba(16, 185, 129, 0.3);
        }
        .animate-spin-slow {
          animation: spin 6s linear;
        }
      `}</style>
    </>
  );
}
