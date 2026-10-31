import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Exclusivo':
        return 'bg-purple-700 text-white';
      case 'Oferta':
        return 'bg-[#E3000B] text-white';
      case 'Nuevo':
        return 'bg-emerald-600 text-white';
      default:
        return 'bg-[#FFD500] text-slate-900';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Insignia / Badge */}
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs ${getBadgeStyle(product.badge)}`}>
          {product.badge}
        </span>
      )}

      {/* Botón de favoritos */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-red-500 shadow-xs hover:scale-110 transition-transform"
        aria-label="Añadir a lista de deseos"
      >
        <svg className="w-5 h-5" fill={isWishlisted ? '#E3000B' : 'none'} stroke={isWishlisted ? '#E3000B' : 'currentColor'} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Imagen del set */}
      <div 
        onClick={() => onQuickView(product)} 
        className="relative bg-slate-100 aspect-4/3 overflow-hidden cursor-pointer flex items-center justify-center p-4"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs">
            Vista rápida
          </span>
        </div>
      </div>

      {/* Detalles del Set */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
            <span className="text-[#E3000B] font-extrabold uppercase tracking-wider">{product.theme}</span>
            <div className="flex items-center gap-1.5">
              <span>{product.age}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {product.rating} ({product.reviews})
              </span>
            </div>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="text-base font-bold text-slate-900 leading-snug hover:text-[#E3000B] transition-colors cursor-pointer line-clamp-2 mb-2"
          >
            {product.name}
          </h3>

          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md mb-4">
            <span className="text-slate-400">Piezas:</span>
            <span className="font-bold text-slate-800">{product.pieces.toLocaleString()}</span>
          </div>
        </div>

        {/* Precios y botón de compra */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight">
              ${product.price.toFixed(2)}
            </div>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-semibold">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-[#FFD500] hover:bg-[#ffc700] text-slate-900 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
}