"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function WaitingPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const socket = new SockJS("https://birthday-backend-v0jj.onrender.com/ws");
    const client = new Client({
      webSocketFactory: () => socket as any,
      onConnect: () => {
        client.subscribe(`/topic/approval/${id}`, (message) => {
          if (message.body === "APPROVED") {
            router.push("/dashboard");
          }
          else if (message.body === "REJECTED") {
            setError("Wrong ID or Password... Go back and enter again.");
          }
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Waiting for approval… ⏳</h1>
        <p className="text-zinc-400">Your surprise is being unlocked…</p>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
