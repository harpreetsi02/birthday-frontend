"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    document.body.classList.add("opacity-100");
  }, []);

  const falling = ["❤️","💖","✨","💝","🌸"];

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-linear-to-br from-pink-200 to-rose-300 transition-opacity duration-700 opacity-0">

      {/* Falling Icons */}
      {falling.map((icon, i) =>
        Array.from({ length: 5 }).map((_, j) => (
          <div
            key={`${i}-${j}`}
            className="absolute -top-12.5 text-xl animate-fall"
            style={{ left: `${10 + j * 20}%`, animationDelay: `${Math.random() * 4}s` }}
          >
            {icon}
          </div>
        ))
      )}

      {/* Balloons */}
      {[15, 35, 55, 75].map((left, i) => (
        <div
          key={i}
          className="absolute -bottom-25 w-10 h-14 bg-linear-to-br from-pink-400 to-rose-500 rounded-full animate-rise"
          style={{ left: `${left}%`, animationDelay: `${i * 2}s` }}
        >
          <div className="absolute left-1/2 -bottom-10 w-0.5 h-10 bg-gray-500 -translate-x-1/2" />
        </div>
      ))}

      {/* Center Card */}
      <div className="bg-white/90 p-10 rounded-2xl shadow-xl text-center max-w-xl animate-card z-10">
        <h1 className="font-[Pacifico] text-3xl text-pink-600 animate-bounceDrop">
          Happy Birthday Bugge 🎂💖
        </h1>

        <div className="text-2xl my-3 text-pink-500 animate-bounceDrop delay-2000">
          💕 ✨
        </div>

        <h3 className="text-gray-700 mt-4 animate-slideUp delay-3000">
          To the most amazing person in my life
        </h3>

        <p className="italic text-gray-600 mt-3 animate-slideUp delay-3500">
          Every moment with you is a gift, and today we celebrate the greatest gift of all - YOU 🌹
        </p>

        <Link
          href="/login"
          className="inline-block mt-6 px-10 py-3 rounded-full bg-linear-to-r from-pink-500 to-rose-400 text-white font-semibold shadow-lg animate-pop delay-4000"
        >
          Begin Your Surprise! 💖
        </Link>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fall {
          to { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall { animation: fall 6s linear infinite; }

        @keyframes rise {
          to { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }
        .animate-rise { animation: rise 10s linear infinite; }

        @keyframes card {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-card { animation: card 1.5s ease-out forwards; }

        @keyframes bounceDrop {
          0% { transform: translateY(-80px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-bounceDrop { animation: bounceDrop 1s ease-out forwards; }

        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp { animation: slideUp .5s ease-out forwards; }

        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop { animation: pop 1s ease-out forwards; }
      `}</style>
    </div>
  );
}
