"use client";

import { usePathname } from "next/navigation";
import LandingNavbar from "../components/landing/LandingNavbar";
import LandingFooter from "../components/landing/LandingFooter";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Ne pas afficher sur ces routes
  const hideLayoutRoutes = ["/login", "/signup"];
  const showLandingLayout = !pathname.startsWith("/coach") && !hideLayoutRoutes.includes(pathname);

  return (
    <html lang="fr">
      <body className="bg-[#0B1231] text-white">
        {showLandingLayout && <LandingNavbar />}
        {children}
        {showLandingLayout && <LandingFooter />}
      </body>
    </html>
  );
}
