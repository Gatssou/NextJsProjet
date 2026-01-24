"use client";
import AuthForm from "../AuthForm";

export default function MobileOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 transition-all">
      <div className="bg-white p-6 rounded-lg w-80 max-w-full relative animate-fade">
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <AuthForm />
      </div>
    </div>
  );
}
