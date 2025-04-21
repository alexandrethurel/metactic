"use client";

// app/coach/layout.jsx
import 'stream-chat-react/dist/css/v2/index.css';
import CoachNavbar from "@/components/coach/CoachNavbar";
import { usePathname } from "next/navigation";

export default function CoachLayout({ children }) {
  const pathname = usePathname();
  const isMatchPreparationPage = pathname?.startsWith("/coach/matches/preparation/");

  return (
    <div className="min-h-screen">
      <CoachNavbar />
      <main className={isMatchPreparationPage ? "bg-[#1c2b2d] text-white p-6" : "bg-gray-100 text-[#0B1231] p-6"}>
        {children}
      </main>
    </div>
  );
}