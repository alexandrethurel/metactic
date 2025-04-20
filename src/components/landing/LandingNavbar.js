// components/navbar/LandingNavbar.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingNavbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-br from-gray-800 to-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-2xl relative z-50"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 hover:opacity-80">
        <Image src="/logo.png" alt="Metactic Logo" width={36} height={36} />
        <span className="text-lg font-semibold">Metactic</span>
      </Link>

      {/* Liens de navigation */}
      <div className="hidden md:flex gap-6 text-sm">
        <a href="#features" className="hover:text-green-400">
          Fonctionnalités
        </a>
        <a href="#about" className="hover:text-green-400">
          À propos
        </a>
        <a href="#contact" className="hover:text-green-400">
          Contact
        </a>
      </div>

      {/* Actions utilisateur */}
      <div className="flex gap-2">
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
    </motion.nav>
  );
}
