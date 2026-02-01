"use client";

import { useEffect, useState } from "react";
import { setCookieConsent, getCookieConsent } from "@/lib/cookie";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    setCookieConsent({
      necessary: true,
      functional: true,
      analytics: true,
      timestamp: Date.now(),
    });
    setVisible(false);
  };

  const refuseAll = () => {
    setCookieConsent({
      necessary: true,
      functional: false,
      analytics: false,
      timestamp: Date.now(),
    });
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
        <p className="text-sm">
          Nous utilisons des cookies nécessaires au fonctionnement du site.
          Vous pouvez accepter ou refuser les cookies optionnels.
        </p>

        <div className="flex gap-2">
          <button
            onClick={refuseAll}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            Refuser
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
