"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ChevronRight, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CoachNavbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const closeMenus = () => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-gradient-to-br from-gray-800 to-gray-900 text-white py-4 px-6 shadow-2xl fixed top-0 left-0 z-50"
      >
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <Image src="/logo.png" alt="Metactic Logo" width={36} height={36} />
            <span className="text-lg font-bold">Metactic</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-12 text-sm items-center relative">
            <Link href="/coach" className="hover:text-green-400">Accueil</Link>

            <div className="relative">
              <button onClick={() => toggleMenu("joueurs")} className="hover:text-green-400 flex items-center gap-1">
                Joueurs <ChevronDown size={16} />
              </button>
              {activeMenu === "joueurs" && (
                <div className="absolute top-full mt-2 left-0 bg-white text-[#0B1231] rounded shadow-md w-40 p-2 text-sm z-50">
                  <Link href="/coach/players/licenses" onClick={closeMenus} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4 text-gray-500" /> Licences
                  </Link>
                  <Link href="/coach/players/tactics" onClick={closeMenus} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4 text-gray-500" /> Tactique
                  </Link>
                  <Link href="/coach/players/lockerroom" onClick={closeMenus} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4 text-gray-500" /> Vestiaire
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => toggleMenu("entrainements")} className="hover:text-green-400 flex items-center gap-1">
                Entraînements <ChevronDown size={16} />
              </button>
              {activeMenu === "entrainements" && (
                <div className="absolute top-full mt-2 left-0 bg-white text-[#0B1231] rounded shadow-md w-44 p-2 text-sm z-50">
                  <Link href="/coach/trainings/preparation/training-1" onClick={closeMenus} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4 text-gray-500" /> Préparation
                  </Link>
                  <Link href="/coach/trainings/analysis" onClick={closeMenus} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4 text-gray-500" /> Analyse
                  </Link>
                  <Link href="/coach/trainings/history" onClick={closeMenus} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4 text-gray-500" /> Historique
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => toggleMenu("matchs")} className="hover:text-green-400 flex items-center gap-1">
                Matchs <ChevronDown size={16} />
              </button>
              {activeMenu === "matchs" && (
                <div className="absolute top-full mt-2 left-0 bg-white text-[#0B1231] rounded shadow-md w-40 p-2 text-sm z-50">
                  <Link href="/coach/matches/preparation/match-1" onClick={closeMenus} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4 text-gray-500" /> Préparation
                  </Link>
                  <Link href="/coach/matches/analysis" onClick={closeMenus} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4 text-gray-500" /> Analyse
                  </Link>
                  <Link href="/coach/matches/history" onClick={closeMenus} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4 text-gray-500" /> Historique
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Profil */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/coach/profile" className="hover:text-green-400">
              <User className="w-5 h-5" />
            </Link>
            <button className="text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-[#0B1231]">
              Déconnexion
            </button>
          </div>

          {/* Burger */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-72 h-screen bg-gray-900 text-white p-6 z-40 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Metactic" width={28} height={28} />
                <span className="font-semibold text-lg">Metactic</span>
              </div>
              <button onClick={closeMenus}><X size={24} /></button>
            </div>

            <ul className="space-y-3 text-sm">
              {[
                ["/coach", "Accueil"],
                ["/coach/players/licenses", "Licences"],
                ["/coach/players/tactics", "Tactique"],
                ["/coach/players/lockerroom", "Vestiaire"],
                ["/coach/trainings/preparation/training-1", "Prépa entraînement"],
                ["/coach/trainings/history", "Historique entraînement"],
                ["/coach/matches/preparation/match-1", "Prépa match"],
                ["/coach/matches/history", "Historique match"],
                ["/coach/profile", "Profil"],
              ].map(([href, label]) => (
                <li key={href} className="flex items-center gap-2">
                  <ChevronDown size={14} />
                  <Link href={href} onClick={closeMenus}>{label}</Link>
                </li>
              ))}
              <hr className="border-gray-600 my-2" />
              <li className="flex items-center gap-2">
                <ChevronDown size={14} />
                <button onClick={closeMenus} className="text-left w-full">Déconnexion</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
