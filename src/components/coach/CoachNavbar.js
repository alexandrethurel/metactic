// components/coach/home/CoachNavbar.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { User, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CoachNavbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-br from-gray-800 to-gray-900 text-white py-4 px-6 shadow-2xl relative z-50"
    >
      <div className="flex justify-between items-center">
        {/* Logo + Nom */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80">
          <Image src="/logo.png" alt="Metactic Logo" width={36} height={36} />
          <span className="text-lg font-bold">Metactic</span>
        </Link>

        {/* Liens de menu */}
        <div className="flex gap-6 text-sm relative">
          {/* Home */}
          <Link href="/coach" className="hover:text-green-400">
            Home
          </Link>

          {/* Joueurs */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("joueurs")}
              className="hover:text-green-400"
            >
              Joueurs
            </button>
            {activeMenu === "joueurs" && (
              <div className="absolute top-full mt-2 left-0 bg-white text-[#0B1231] rounded shadow-md w-40 p-2 text-sm">
                <Link
                  href="/coach/players/licenses"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  Licences
                </Link>
                <Link
                  href="/coach/players/tactics"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  Tactique
                </Link>
                <Link
                  href="/coach/players/lockerroom"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  Vestiaire
                </Link>
              </div>
            )}
          </div>

          {/* Entraînements */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("entrainements")}
              className="hover:text-green-400"
            >
              Entraînements
            </button>
            {activeMenu === "entrainements" && (
              <div className="absolute top-full mt-2 left-0 bg-white text-[#0B1231] rounded shadow-md w-40 p-2 text-sm">
                <Link
                  href="/coach/trainings/preparation/training-1"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  Préparation
                </Link>
                <Link
                  href="/coach/trainings/analysis"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  Analyse
                </Link>
                <Link
                  href="/coach/trainings/history"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  Historique
                </Link>
              </div>
            )}
          </div>

          {/* Matchs */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("matchs")}
              className="hover:text-green-400"
            >
              Matchs
            </button>
            {activeMenu === "matchs" && (
              <div className="absolute top-full mt-2 left-0 bg-white text-[#0B1231] rounded shadow-md w-40 p-2 text-sm">
                <Link
                  href="/coach/matches/preparation"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  Préparation
                </Link>
                <Link
                  href="/coach/matches/analysis"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  Analyse
                </Link>
                <Link
                  href="/coach/matches/history"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  Historique
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Profil + Déconnexion */}
        <div className="flex items-center gap-4">
          <Link href="/coach/profile" className="hover:text-green-400">
            <User className="w-5 h-5" />
          </Link>
          <button className="text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-[#0B1231]">
            Déconnexion
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
