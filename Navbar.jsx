import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenAuth, onSearch, searchQuery }) {
  const { currentUser, logout } = useAuth();
  const { totalItems, setIsCartOpen, wishlist } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Banner superior de aviso oficial */}
      <div className="bg-[#E3000B] text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex justify-center items-center gap-2">
        <span className="bg-[#FFD500] text-slate-900 text-[10px] uppercase font-black px-1.5 py-0.5 rounded-sm">VIP Exclusivo</span>
        <span>¡Envío GRATIS en todos los pedidos superiores a $150! Puntos VIP dobles hoy.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Marca / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#E3000B] flex items-center justify-center rounded-lg shadow-md border-2 border-[#FFD500] cursor-pointer hover:scale-105 transition-transform">
            <span className="text-white font-black text-2xl tracking-tighter drop-shadow-sm select-none">
              LEGO
            </span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
              LEGO® STORE
            </h1>
            <p className="text-[11px] font-bold text-amber-600 uppercase tracking-widest mt-0.5">
              Catálogo Oficial & Coleccionistas
            </p>
          </div>
        </div>

        {/* Buscador central */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <input
            type="text"
            placeholder="Buscar sets, temas (ej. Star Wars, Harry Potter)..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:border-[#E3000B] focus:ring-2 focus:ring-red-100 outline-hidden transition-all"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Acciones de usuario y carrito */}
        <div className="flex items-center gap-3">
          {/* Favoritos */}
          <div className="relative hidden sm:flex items-center justify-center p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer" title="Lista de Deseos">
            <svg className="w-6 h-6" fill={wishlist.length > 0 ? "#E3000B" : "none"} stroke={wishlist.length > 0 ? "#E3000B" : "currentColor"} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Botón Carrito */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-full font-bold text-sm transition-all"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden sm:inline">Bolsa</span>
            <span className="bg-[#E3000B] text-white text-xs font-black px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </button>

          {/* Usuario / Login */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-lg shadow-xs" title={currentUser.name}>
                {currentUser.avatar}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{currentUser.name}</p>
                <p className="text-[10px] text-amber-700 font-semibold">{currentUser.role}</p>
              </div>
              <button
                onClick={logout}
                className="text-xs font-semibold text-slate-500 hover:text-red-600 ml-1 p-1 hover:bg-red-50 rounded-md transition-colors"
                title="Cerrar sesión"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-[#E3000B] hover:bg-[#c70009] text-white text-sm font-extrabold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Entrar / Registrarse</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}