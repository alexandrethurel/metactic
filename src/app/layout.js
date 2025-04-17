// app/layout.jsx
import LandingNavbar from "../components/landing/LandingNavbar";
import LandingFooter from "../components/landing/LandingFooter";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-[#0B1231] text-white">
        <LandingNavbar />
        {children}
        <LandingFooter />
      </body>
    </html>
  );
}