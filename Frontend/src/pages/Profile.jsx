import React from "react";
import Navbar from "../components/Navbar";
import CopyrightFooter from "../components/CopyrightFooter";

export default function Profile() {
  // Aquí deberías obtener los datos del usuario actual desde tu contexto o llamada a API
  const user = {
    username: "Juan Pérez",
    email: "juan.perez@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=7"
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-orbitron">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-900 p-6 rounded-lg shadow-lg text-center">
          <img
            src={user.avatarUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-400"
          />
          <h1 className="text-2xl font-bold text-blue-400 mb-2">
            {user.username}
          </h1>
          <p className="text-gray-300 mb-6">{user.email}</p>
          <button
            onClick={() => console.log("Editar perfil")}            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition text-white"
          >
            Editar Perfil
          </button>
        </div>
      </main>
      <CopyrightFooter />
    </div>
  );
}
