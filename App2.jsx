import React, { useState, useMemo } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LEGO_SETS, CATEGORIES } from './data/legoData';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

function MainCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(900);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Filtrado y ordenamiento en tiempo real
  const filteredSets = useMemo(() => {
    return LEGO_SETS.filter(item => {
      const matchCategory = selectedCategory === 'Todos' || item.theme === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.theme.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = item.price <= maxPrice;
      return matchCategory && matchSearch && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'pieces') return b.pieces - a.pieces;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      {/* Hero Banner Promocional */}
      <section className="relative bg-gradient-to-r from-red-600 via-[#E3000B] to-amber-600 text-white overflow-hidden py-12 md:py-16 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="bg-[#FFD500] text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
              Nueva Colección 2026
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-4">
              Construye mundos sin límites.
            </h2>
            <p className="text-sm md:text-base text-red-100 font-medium leading-relaxed mb-6">
              Descubre los sets más galardonados de Star Wars, Icons, Technic y Harry Potter con detalles de ingeniería real.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button 
                onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
                className="bg-[#FFD500] hover:bg-[#ffc700] text-slate-900 font-black px-6 py-3 rounded-full text-sm shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                Ver Catálogo Completo
              </button>
              <button 
                onClick={() => setSelectedCategory('Star Wars')}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm backdrop-blur-xs transition-all cursor-pointer"
              >
                Sets Star Wars™
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80"
                alt="LEGO Star Wars"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal y Filtros */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Barra de Filtros por Categoría */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[#E3000B] text-white shadow-md scale-105'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Fila de Controles y Ordenamiento */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 w-full md:w-auto">
            <span className="font-bold text-slate-900">{filteredSets.length}</span> sets encontrados
            {selectedCategory !== 'Todos' && (
              <span className="bg-red-50 text-[#E3000B] text-xs font-bold px-2 py-0.5 rounded-md">
                {selectedCategory}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
            {/* Slider de precio */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span>Hasta: ${maxPrice}</span>
              <input
                type="range"
                min="40"
                max="900"
                step="20"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-28 cursor-pointer"
              />
            </div>

            {/* Selector de orden */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span>Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-hidden focus:border-[#E3000B]"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="pieces">Más Piezas</option>
                <option value="rating">Mejor Calificados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cuadrícula de Sets */}
        {filteredSets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSets.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-slate-800">No encontramos ningún set con esos filtros</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              Prueba cambiando el rango de precio o buscando un término diferente.
            </p>
            <button
              onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); setMaxPrice(900); }}
              className="bg-[#E3000B] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#c70009] transition-all"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </main>

      {/* Modales y Cajón Lateral */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <CartDrawer />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainCatalog />
      </CartProvider>
    </AuthProvider>
  );
}