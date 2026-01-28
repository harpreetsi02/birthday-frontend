"use client";

import { useState } from "react";
import Confetti from "react-confetti";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100">
      {open && <Confetti />}

      {!open ? (
        <div
          onClick={() => setOpen(true)}
          className="cursor-pointer bg-white p-10 rounded-xl shadow-xl"
        >
          <h2 className="text-xl font-semibold">💌 Tap to open your surprise</h2>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-xl shadow-xl text-center">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">
            Happy Birthday 🎉
          </h1>
          <p className="text-lg">
            Tumhari smile meri favorite cheez hai...  
            Aaj ke din bas itna kehna tha:  
            You are special 💖
          </p>
        </div>
      )}
    </div>
  );
}
