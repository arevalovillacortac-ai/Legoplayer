import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-slate-200 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-slate-100 p-6 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-full max-h-72 object-cover rounded-2xl shadow-md" />
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#E3000B] uppercase tracking-wider">{product.theme}</span>
              <h2 className="text-xl font-black text-slate-900 mt-1 mb-2">{product.name}</h2>
              
              <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-600">
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-sm font-bold">★ {product.rating}</span>
                <span>• {product.pieces} piezas</span>
                <span>• Edad {product.age}</span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                  <button 
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                  >-</button>
                  <span className="px-3 py-2 font-bold text-sm">{qty}</span>
                  <button 
                    onClick={() => setQty(q => q + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                  >+</button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, qty);
                    onClose();
                  }}
                  className="flex-1 bg-[#E3000B] hover:bg-[#c70009] text-white font-extrabold text-sm py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Añadir a la bolsa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}