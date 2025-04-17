// app/coach/layout.jsx

import CoachNavbar from "@/components/coach/CoachNavbar";

export default function CoachLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-[#0B1231]">
      <CoachNavbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
