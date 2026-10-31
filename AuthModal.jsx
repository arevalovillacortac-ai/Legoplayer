import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, users } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isRegisterMode) {
        if (!name.trim()) throw new Error('Por favor ingresa tu nombre completo.');
        if (password.length < 3) throw new Error('La contraseña debe tener al menos 3 caracteres.');
        register(name, email, password);
        setSuccess('¡Cuenta creada exitosamente! Bienvenido a LEGO Club.');
      } else {
        login(email, password);
        setSuccess('¡Bienvenido de nuevo!');
      }

      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#E3000B] border-2 border-[#FFD500] rounded-xl flex items-center justify-center mx-auto shadow-md mb-3">
            <span className="text-white font-black text-2xl">LEGO</span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            {isRegisterMode ? 'Crear Cuenta LEGO® VIP' : 'Iniciar Sesión'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isRegisterMode
              ? 'Únete para acumular puntos, guardar sets y comprar más rápido.'
              : 'Accede a tu cuenta personal para ver tus sets guardados.'}
          </p>
        </div>

        {/* Pestañas de modo */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => { setIsRegisterMode(false); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              !isRegisterMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Ya tengo cuenta
          </button>
          <button
            type="button"
            onClick={() => { setIsRegisterMode(true); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              isRegisterMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Crear cuenta nueva
          </button>
        </div>

        {/* Alertas */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3 rounded-xl mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-3 rounded-xl mb-4">
            {success}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tu Nombre o Apodo
              </label>
              <input
                type="text"
                placeholder="Ej. Lucas Skywalker"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm bg-slate-50 border border-slate-300 focus:border-[#E3000B] focus:bg-white rounded-xl px-4 py-2.5 outline-hidden transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-300 focus:border-[#E3000B] focus:bg-white rounded-xl px-4 py-2.5 outline-hidden transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-300 focus:border-[#E3000B] focus:bg-white rounded-xl px-4 py-2.5 outline-hidden transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E3000B] hover:bg-[#c70009] text-white font-extrabold text-sm py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer mt-2"
          >
            {isRegisterMode ? 'Registrar mi Cuenta' : 'Entrar a mi Cuenta'}
          </button>
        </form>

        {/* Info demo rápida para pruebas */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-500">
          <p>Cuenta demo disponible: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-bold">admin@lego.com</code> / <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-bold">123</code></p>
          <p className="mt-1">Actualmente hay <strong>{users.length}</strong> cuenta(s) registradas en este navegador.</p>
        </div>
      </div>
    </div>
  );
}