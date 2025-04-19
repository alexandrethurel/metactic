"use client";

import { usePathname } from "next/navigation";
import LandingNavbar from "../components/landing/LandingNavbar";
import LandingFooter from "../components/landing/LandingFooter";
import { AuthProvider } from "../context/AuthContext"; // 👈 ici
import "../styles/globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideLayoutRoutes = ["/login", "/signup"];
  const showLandingLayout = !pathname.startsWith("/coach") && !hideLayoutRoutes.includes(pathname);

  return (
    <html lang="fr">
      <body className="bg-[#0B1231] text-white">
        <AuthProvider> 
          {showLandingLayout && <LandingNavbar />}
          {children}
          {showLandingLayout && <LandingFooter />}
        </AuthProvider>
      </body>
    </html>
  );
}
