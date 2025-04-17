"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "coach",
    clubName: "",
    clubCategory: "",
    phoneNumber: "",
    address: "",
    shareCode: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      console.log("Inscription avec:", formData);
      router.push("/coach");
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setErrorMessage("Erreur lors de la création du compte.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-center text-[#0B1231]">Créer un compte</h1>

        <p className="text-center mb-4 text-sm text-gray-700">
          Déjà un compte ?{' '}
          <a href="/login" className="text-green-600 font-medium hover:underline">
            Se connecter
          </a>
        </p>

        {/* Toggle coach/joueur */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setFormData((prev) => ({ ...prev, role: "coach" }))}
            className={`px-4 py-2 rounded border ${formData.role === "coach" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
          >
            Coach
          </button>
          <button
            onClick={() => setFormData((prev) => ({ ...prev, role: "player" }))}
            className={`px-4 py-2 rounded border ${formData.role === "player" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
          >
            Joueur
          </button>
        </div>

        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {formData.role === "coach" && (
            <>
              <div>
                <label htmlFor="clubName" className="block text-sm font-medium text-gray-700">Nom du club</label>
                <input
                  type="text"
                  name="clubName"
                  id="clubName"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  value={formData.clubName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="clubCategory" className="block text-sm font-medium text-gray-700">Catégorie d'équipe</label>
                <select
                  name="clubCategory"
                  id="clubCategory"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black"
                  value={formData.clubCategory}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="U7">U7</option>
                  <option value="U9">U9</option>
                  <option value="U11">U11</option>
                  <option value="U13">U13</option>
                  <option value="U15">U15</option>
                  <option value="U17">U17</option>
                  <option value="U19">U19</option>
                  <option value="Seniors">Seniors</option>
                  <option value="Loisirs">Loisirs</option>
                </select>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {formData.role === "player" && (
            <div>
              <label htmlFor="shareCode" className="block text-sm font-medium text-gray-700">Code de partage du club</label>
              <input
                type="text"
                name="shareCode"
                id="shareCode"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                value={formData.shareCode}
                onChange={handleChange}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Créer un compte
          </button>
        </form>
      </div>
    </div>
  );
}
