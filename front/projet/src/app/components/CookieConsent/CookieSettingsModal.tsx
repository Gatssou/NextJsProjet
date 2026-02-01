"use client";

import { useState } from "react";
import Cookies from "js-cookie";

type Props = {
  onClose: () => void;
};

export default function CookieSettingModal({ onClose }: Props) {
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  const savePreferences = () => {
    const consent = {
      necessary: true,
      functional,
      analytics,
      timestamp: Date.now(),
    };

    Cookies.set("cookie_consent", JSON.stringify(consent), {
      expires: 365,
      sameSite: "lax",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white max-w-lg w-full p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-bold">Paramètres des cookies</h2>

        <p className="text-sm text-gray-600">
          Vous pouvez choisir quels cookies activer.  
          Les cookies strictement nécessaires sont toujours actifs.
        </p>

        <div className="space-y-3">
          {/* NECESSARY */}
          <div className="flex items-center justify-between">
            <span>Cookies nécessaires</span>
            <input type="checkbox" checked disabled />
          </div>

          {/* FUNCTIONAL */}
          <div className="flex items-center justify-between">
            <span>Cookies fonctionnels</span>
            <input
              type="checkbox"
              checked={functional}
              onChange={(e) => setFunctional(e.target.checked)}
            />
          </div>

          {/* ANALYTICS */}
          <div className="flex items-center justify-between">
            <span>Cookies analytiques</span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            className="px-4 py-2 border rounded"
            onClick={onClose}
          >
            Annuler
          </button>

          <button
            className="px-4 py-2 bg-black text-white rounded"
            onClick={savePreferences}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
