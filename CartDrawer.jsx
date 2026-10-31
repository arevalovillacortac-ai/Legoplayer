import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, freeShippingThreshold, freeShippingRemaining } = useCart();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Cabecera */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-slate-900">Mi Bolsa LEGO®</span>
              <span className="bg-[#E3000B] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Barra de envío gratis */}
          <div className="p-4 bg-amber-50 border-b border-amber-200/60">
            {freeShippingRemaining > 0 ? (
              <p className="text-xs font-semibold text-amber-900">
                Agrega <span className="font-extrabold text-[#E3000B]">${freeShippingRemaining.toFixed(2)}</span> más para conseguir <strong>Envío Gratis</strong>.
              </p>
            ) : (
              <p className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <span>🎉</span> ¡Felicidades! Tienes Envío Gratis incluido.
              </p>
            )}
            <div className="w-full bg-amber-200 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#E3000B] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-3">🧱</div>
                <h3 className="text-base font-bold text-slate-800">Tu bolsa está vacía</h3>
                <p className="text-xs text-slate-500 mt-1">¡Explora el catálogo y añade tus sets favoritos!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-slate-100 shrink-0 border border-slate-200" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{item.theme} • {item.pieces} pcs</p>
                    <p className="text-sm font-black text-slate-900 mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-200 rounded-md bg-slate-50 text-xs">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-0.5 hover:bg-slate-200 font-bold">-</button>
                        <span className="px-2 font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-0.5 hover:bg-slate-200 font-bold">+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] font-semibold text-red-500 hover:underline"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer del Carrito */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="flex justify-between text-sm font-medium text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-slate-600">
                <span>Envío estimado</span>
                <span className="font-bold text-slate-900">{freeShippingRemaining === 0 ? 'GRATIS' : '$9.99'}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span>${(subtotal + (freeShippingRemaining === 0 ? 0 : 9.99)).toFixed(2)}</span>
              </div>

              <button
                onClick={() => alert('¡Gracias por tu compra de prueba! Tus sets de LEGO se procesarían aquí.')}
                className="w-full bg-[#E3000B] hover:bg-[#c70009] text-white font-black py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm tracking-wide uppercase active:scale-98"
              >
                Proceder al Pago
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}