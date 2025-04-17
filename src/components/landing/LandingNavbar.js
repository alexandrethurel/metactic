// components/navbar/LandingNavbar.js
import Image from "next/image";
import Link from "next/link";

export default function LandingNavbar() {
  return (
    <nav className="w-full bg-[#0B1231] text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Metactic Logo" width={36} height={36} />
        <span className="text-lg font-semibold">Metactic</span>
      </div>
      <div className="hidden md:flex gap-6 text-sm">
        <a href="#features" className="hover:text-green-400">Fonctionnalités</a>
        <a href="#about" className="hover:text-green-400">À propos</a>
        <a href="#contact" className="hover:text-green-400">Contact</a>
      </div>
      <div className="flex gap-2">
        <Link href="/login" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-[#0B1231] text-sm">Connexion</Link>
        <Link href="/signup" className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 text-sm">Inscrire mon équipe</Link>
      </div>
    </nav>
  );
}