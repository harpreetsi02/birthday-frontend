"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  
    const data = await res.json();
    router.push(`/waiting/${data.id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-xl shadow-xl w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Private Access</h1>

        <input
          placeholder="Enter your username"
          className="w-full p-2 rounded bg-zinc-800 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          type="text"   // pehle password tha, ab text
          placeholder="Enter your password"
          className="w-full p-2 rounded bg-zinc-800 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-pink-600 hover:bg-pink-700 p-2 rounded"
        >
          Request Access
        </button>
      </div>
    </div>
  );
}
