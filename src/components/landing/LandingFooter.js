"use client";

import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="bg-gray-100 text-[#0B1231] py-16 mt-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Bloc gauche : Logo + slogan */}
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Metactic</h2>
          <p className="text-sm max-w-sm">
            Gérer votre club de football amateur avec une plateforme intelligente, simple et collaborative.
          </p>
        </div>

        {/* Bloc centre : Liens */}
        <div className="space-y-2 text-center text-sm">
          <Link href="/about" className="block hover:underline">
            À propos
          </Link>
          <Link href="/about/privacy" className="block hover:underline">
            Politique de confidentialité
          </Link>
          <Link href="/about/terms" className="block hover:underline">
            Conditions d'utilisation
          </Link>
        </div>

        {/* Bloc droit : Contact ou réseaux sociaux (optionnel) */}
        <div className="text-center mt-8 md:mt-0">
          <p className="text-sm">© {new Date().getFullYear()} Metactic. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
