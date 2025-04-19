"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 
import { simulateLogin } from "@/lib/api/guest/auth";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const user = await simulateLogin(formData.email, formData.password);
      console.log("Utilisateur connecté :", user);

      login(user); 

      router.push("/coach");
    } catch (error) {
      console.error("Erreur de connexion:", error.message);
      setErrorMessage("Identifiants invalides. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-center text-[#0B1231]">Connexion !</h1>

        <p className="text-center mb-4 text-sm text-gray-700">
          Pas encore de compte ?{" "}
          <a href="/signup" className="text-green-600 font-medium hover:underline">
            Créer un compte !
          </a>
        </p>

        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse e-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-green-500 focus:border-green-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-green-500 focus:border-green-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Se connecter
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">Ou</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-300 w-full py-2 rounded shadow-sm hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}