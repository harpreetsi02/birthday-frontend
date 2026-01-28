"use client";

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function AdminPage() {
  const [requests, setRequests] = useState<any[]>([]);

  const loadPending = async () => {
    const res = await fetch("http://localhost:8080/api/admin/pending");
    const data = await res.json();
    setRequests(data);
  };

  const approve = async (id: number) => {
    await fetch(`http://localhost:8080/api/admin/approve/${id}`, { method: "POST" });
    loadPending();
  };

  const reject = async (id: number) => {
    await fetch(`http://localhost:8080/api/admin/reject/${id}`, { method: "POST" });
    loadPending();
  };

  useEffect(() => {
    loadPending();
  }, []);

    useEffect(() => {
      loadPending();

      const socket = new SockJS("http://localhost:8080/ws");
      const client = new Client({
        webSocketFactory: () => socket as any,
        onConnect: () => {
          client.subscribe("/topic/admin/new", (msg) => {
            const newReq = JSON.parse(msg.body);
            setRequests(prev => [newReq, ...prev]);
          });
        },
      });

      client.activate();

      return () => {
        client.deactivate();
      };
    }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl mb-6">Admin Panel</h1>

      {requests.map((r) => (
        <div key={r.id} className="bg-zinc-900 p-4 rounded mb-3">
          <div><b>Username:</b> {r.username}</div>
          <div><b>Password:</b> {r.password}</div>
          
          <div className="mt-2">
            <button
              onClick={() => approve(r.id)}
              className="bg-green-600 px-3 py-1 mr-2 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => reject(r.id)}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
