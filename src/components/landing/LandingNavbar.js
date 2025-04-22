"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

export default function LandingNavbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const desktopMenus = [
    { label: "La solution", menu: ["Fonctionnalités", "Notre équipe", "Nos engagements"] },
    { label: "Tarifs", menu: ["Forfaits", "Personnalisation", "Essai gratuit"] },
    { label: "À propos", menu: ["Carrières", "Presse", "Mentions légales"] },
    { label: "Support", menu: ["Service client", "FAQ", "Contact"] },
  ];

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-gradient-to-br from-gray-800 to-gray-900 text-white py-4 px-6 shadow-2xl relative z-50"
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <Image src="/logo.png" alt="Metactic Logo" width={36} height={36} />
            <span className="text-lg font-semibold">Metactic</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-20 text-base">
            {desktopMenus.map(({ label, menu }) => (
              <div key={label} className="relative">
                <button
                  onClick={() => toggleMenu(label)}
                  className="hover:text-green-400 flex items-center gap-1"
                >
                  {label}
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
                {activeMenu === label && (
                  <div className="absolute top-full left-0 mt-2 bg-white text-[#0B1231] rounded shadow-md w-48 p-2 text-sm z-50">
                    {menu.map((item) => (
                      <Link
                        href="#"
                        key={item}
                        className="block px-3 py-2 hover:bg-gray-100 rounded"
                        onClick={() => setActiveMenu(null)}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-3">
            <Link
              href="/login"
              className="border border-white px-4 py-2 rounded hover:bg-white hover:text-[#0B1231] text-sm"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 text-sm"
            >
              Inscrire mon équipe
            </Link>
          </div>

          {/* Mobile burger */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileOpen((prev) => !prev)}>
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-[76px] left-4 right-4 z-40 bg-gray-900 p-4 rounded shadow-lg text-sm space-y-3"
          >
            {desktopMenus.map(({ label }) => (
              <Link
                key={label}
                href="#"
                onClick={() => setIsMobileOpen(false)}
                className="block hover:text-green-400 text-white"
              >
                {label}
              </Link>
            ))}
            <hr className="border-gray-700" />
            <Link href="/login" onClick={() => setIsMobileOpen(false)} className="block hover:text-green-400 text-white">
              Connexion
            </Link>
            <Link href="/signup" onClick={() => setIsMobileOpen(false)} className="block hover:text-green-400 text-white">
              Inscrire mon équipe
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
