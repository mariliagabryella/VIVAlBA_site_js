"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            email:email, 
            password: password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login");
      } else {
        alert(data.error || "Erro ao registar!");
      }
    } catch (error) {
      console.error("Erro no fetch:", error);
      alert("Erro de ligação ao servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="p-8 border rounded shadow-md w-80 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-black text-center">Criar Conta</h1>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded text-black border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded text-black border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Registar
        </button>
        
        <p className="mt-4 text-sm text-center text-gray-600">
          Já tem conta? <a href="/login" className="text-blue-500 hover:underline">Entre aqui</a>
        </p>
      </form>
    </div>
  );
}