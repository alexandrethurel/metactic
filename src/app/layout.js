"use client";

import { usePathname } from "next/navigation";
import LandingNavbar from "../components/landing/LandingNavbar";
import LandingFooter from "../components/landing/LandingFooter";
import CoachNavbar from "../components/coach/CoachNavbar";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideLayoutRoutes = ["/login", "/signup"];
  const isCoachRoute = pathname.startsWith("/coach");
  const showLandingLayout = !isCoachRoute && !hideLayoutRoutes.includes(pathname);

  return (
    <html lang="fr">
      <body className="bg-[#0B1231] text-white">
        <AuthProvider>
          {showLandingLayout && <LandingNavbar />}
          {isCoachRoute && <CoachNavbar />}

          <main className={isCoachRoute ? "pt-16" : ""}>
            {children}
          </main>

          {showLandingLayout && <LandingFooter />}
        </AuthProvider>
      </body>
    </html>
  );
}
