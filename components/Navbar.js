"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full z-50 top-0 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Esquerda: Logo e Links Principais */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tighter">
              VIVALBA
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/eventos" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Eventos</Link>
              <Link href="/contactos" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Contactos</Link>
            </div>
          </div>

          {/* Direita: Lógica de Login / User Dropdown */}
          <div className="flex items-center">
            {!user ? (
              <Link 
                href="/login" 
                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                Entrar
              </Link>
            ) : (
              <div className="relative">
                {/* Botão do Utilizador */}
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 group focus:outline-none"
                >
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {user.name || user.email.split('@')[0]}
                    </span>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none">
                      {user.role || 'Membro'}
                    </span>
                  </div>
                  {/* Ícone de seta simples */}
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <>
                    {/* Overlay para fechar ao clicar fora */}
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    
                    <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2 animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-2 border-b border-gray-50 mb-2">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Minha Conta</p>
                        <p className="text-xs text-gray-600 truncate">{user.email}</p>
                      </div>
                      
                      <Link href="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium">
                        O meu Perfil
                      </Link>
                      
                      {user.role === "ADMIN" && (
                        <Link href="/novo-evento" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium">
                          Criar Evento
                        </Link>
                      )}

                      <button 
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-bold transition-colors mt-2 pt-2 border-t border-gray-50"
                      >
                        Sair da Conta
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}