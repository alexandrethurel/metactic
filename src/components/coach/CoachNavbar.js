"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { User } from "lucide-react";

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
    <nav
      ref={navRef}
      className="w-full bg-[#0B1231] text-white py-4 px-6 shadow relative z-50"
    >
      <div className="flex justify-between items-center">
        {/* Logo + Nom */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80">
          <Image src="/logo.png" alt="Metactic Logo" width={36} height={36} />
          <span className="text-lg font-bold">Metactic</span>
        </Link>

        {/* Liens de menu */}
        <div className="flex gap-6 text-sm relative">
          {/* Menu Home */}
          <div>
            <Link href="/coach" className="hover:text-green-400">
              Home
            </Link>
          </div>

          {/* Menu Joueurs */}
          <div className="relative">
            <button onClick={() => toggleMenu("joueurs")} className="hover:text-green-400">
              Joueurs
            </button>
            {activeMenu === "joueurs" && (
              <div className="absolute top-full mt-2 left-0 bg-white text-[#0B1231] rounded shadow-md w-40 p-2 text-sm">
                <Link
                  href="/coach/players/licenses"
                  className="block px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  Licences
                </Link>
                <Link
                  href="/coach/players/tactics"
                  className="block px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  Tactique
                </Link>
                <Link
                  href="/coach/players/lockerroom"
                  className="block px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  Vestiaire
                </Link>
              </div>
            )}
          </div>

          {/* Menu Entraînements */}
          <div className="relative">
            <button onClick={() => toggleMenu("entrainements" )} className="hover:text-green-400">
              Entraînements
            </button>
            {activeMenu === "entrainements" && (
              <div className="absolute top-full mt-2 left-0 bg-white text-[#0B1231] rounded shadow-md w-40 p-2 text-sm">
                <Link
                  href="/coach/trainings/preparation/training-1"
                  className="block px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  Préparation
                </Link>
                <Link
                  href="/coach/trainings/analysis"
                  className="block px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  Analyse
                </Link>
                <Link
                  href="/coach/trainings/history"
                  className="block px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  Historique
                </Link>
              </div>
            )}
          </div>

          {/* Menu Matchs */}
          <div className="relative">
            <button onClick={() => toggleMenu("matchs")} className="hover:text-green-400">
              Matchs
            </button>
            {activeMenu === "matchs" && (
              <div className="absolute top-full mt-2 left-0 bg-white text-[#0B1231] rounded shadow-md w-40 p-2 text-sm">
                <Link
                  href="/coach/matches/preparation"
                  className="block px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  Préparation
                </Link>
                <Link
                  href="/coach/matches/analysis"
                  className="block px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  Analyse
                </Link>
                <Link
                  href="/coach/matches/history"
                  className="block px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveMenu(null)}
                >
                  Historique
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Déconnexion + Profil */}
        <div className="flex items-center gap-4">
          <Link href="/coach/profile" className="hover:text-green-400">
            <User className="w-5 h-5" />
          </Link>
          <button className="text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-[#0B1231]">
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}