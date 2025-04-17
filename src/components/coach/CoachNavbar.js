import Image from "next/image";
import Link from "next/link";

export default function CoachNavbar() {
  return (
    <nav className="w-full bg-[#0B1231] text-white py-4 px-6 flex justify-between items-center shadow">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Metactic Logo" width={36} height={36} />
        <span className="text-lg font-bold">Metactic</span>
      </div>

      <div className="hidden md:flex gap-6 text-sm">
        <Link href="/coach" className="hover:text-green-400">Tableau de bord</Link>
        <Link href="/coach/trainings" className="hover:text-green-400">Entraînements</Link>
        <Link href="/coach/players" className="hover:text-green-400">Joueurs</Link>
        <Link href="/coach/formations" className="hover:text-green-400">Formations</Link>
      </div>

      <div className="flex gap-2">
        <button className="text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-[#0B1231]">
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
