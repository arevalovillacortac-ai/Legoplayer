import { useState } from 'react';

// Datos iniciales de productos (puedes cambiar las URLs por imágenes locales importadas)
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'Halcón Milenario Star Wars',
    category: 'Star Wars',
    price: 169.99,
    pieces: 1351,
    badge: 'Más Vendido',
    image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=800&auto=format&fit=crop',
    description: 'El legendario Halcón Milenario con figuras exclusivas y detalles interiores completos.'
  },
  {
    id: 2,
    title: 'Auto de Carreras Technic',
    category: 'Technic',
    price: 89.99,
    pieces: 830,
    badge: 'Nuevo',
    image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=800&auto=format&fit=crop',
    description: 'Sistema de suspensión real, motor V6 funcional y diseño aerodinámico deportivo.'
  },
  {
    id: 3,
    title: 'Castillo de Hogwarts',
    category: 'Harry Potter',
    price: 469.99,
    pieces: 6020,
    badge: 'Exclusivo VIP',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    description: 'Increíble réplica a escala micro del gran castillo de Hogwarts con las 4 casas.'
  },
  {
    id: 4,
    title: 'Edificio LEGO Architecture NYC',
    category: 'Architecture',
    price: 59.99,
    pieces: 598,
    badge: 'Colección',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop',
    description: 'Capta la esencia arquitectónica de Nueva York con sus rascacielos emblemáticos.'
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null); // Almacena el usuario logueado
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Manejar inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail.trim() !== '') {
      const username = loginEmail.split('@')[0];
      setUser({ name: username, email: loginEmail });
      setIsLoginOpen(false);
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Modificar cantidad en carrito
  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Eliminar producto directamente del carrito
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Filtrar productos
  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      {/* HEADER PRINCIPAL */}
      <header className="sticky top-0 z-40 bg-[#E3000B] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-[#FFD500] text-black font-black text-2xl tracking-wider px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              LEGO
            </div>
            <span className="font-extrabold text-xl tracking-tight hidden sm:inline">
              Store <span className="text-[#FFD500]">Oficial</span>
            </span>
          </div>

          {/* Buscador */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar sets, minifiguras, temas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-800 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD500] shadow-inner"
            />
          </div>

          {/* Acciones de usuario y carrito */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-xs font-bold">
                <span className="text-[#FFD500]">Hola, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-white/40 px-2 py-0.5 rounded text-white text-[10px]"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-1.5 bg-black/20 hover:bg-black/30 px-3.5 py-2 rounded-full text-xs font-bold transition"
              >
                <span className="bg-[#006CB7] text-[10px] px-1.5 py-0.5 rounded font-black">VIP</span>
                <span>Iniciar Sesión</span>
              </button>
            )}

            {/* Botón Carrito */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-[#FFD500] hover:bg-amber-400 text-black font-extrabold px-4 py-2 rounded-full flex items-center gap-2 shadow-md transition transform active:scale-95 text-xs sm:text-sm"
            >
              <span>🛒 Carrito</span>
              {totalItemsInCart > 0 && (
                <span className="bg-black text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItemsInCart}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-[#FFD500] to-amber-400 py-10 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left max-w-xl">
            <span className="inline-block bg-black text-[#FFD500] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Lanzamiento Exclusivo
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              ¡CONSTRUYE TUS SUEÑOS!
            </h1>
            <p className="text-slate-800 text-base font-medium">
              Explora nuestra colección oficial de sets icónicos, minifiguras de colección y ofertas exclusivas para fanáticos.
            </p>
            <div>
              <a
                href="#catalogo"
                className="inline-block bg-[#E3000B] hover:bg-red-700 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition"
              >
                Ver Catálogo Completo
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=800&auto=format&fit=crop"
              alt="LEGO Hero"
              className="rounded-2xl shadow-2xl border-4 border-white object-cover max-h-72 w-full"
            />
          </div>
        </div>
      </section>

      {/* CATÁLOGO DE PRODUCTOS */}
      <main id="catalogo" className="max-w-7xl mx-auto px-4 py-10 flex-1 w-full">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <h2 className="text-2xl font-black text-slate-900 border-l-4 border-[#E3000B] pl-3">
            Sets Destacados
          </h2>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['Todos', 'Star Wars', 'Technic', 'Harry Potter', 'Architecture'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-[#006CB7] text-white shadow'
                    : 'bg-white text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition flex flex-col overflow-hidden border border-slate-200 group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#FFD500] text-black text-[10px] font-black px-2 py-0.5 rounded shadow">
                  {product.badge}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-[#006CB7] uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base leading-snug mt-1">
                    {product.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-[#E3000B]">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-[#006CB7] hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow transition"
                  >
                    + Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL INICIAR SESIÓN */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border-t-8 border-[#E3000B]">
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-3 right-4 text-slate-400 hover:text-slate-800 font-bold text-lg"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="inline-block bg-[#FFD500] text-black font-black text-xl px-3 py-1 rounded border-2 border-black mb-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                LEGO VIP
              </div>
              <h3 className="text-xl font-black text-slate-800">Inicia Sesión</h3>
              <p className="text-xs text-slate-500">Accede a tus puntos y promociones de socio</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006CB7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006CB7]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#E3000B] hover:bg-red-700 text-white font-extrabold py-2.5 rounded-xl shadow transition text-sm"
              >
                Ingresar a mi Cuenta
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER DEL CARRITO DE COMPRAS */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between">
            {/* Header Carrito */}
            <div className="bg-[#E3000B] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-black text-lg">Tu Carrito LEGO</span>
                <span className="bg-[#FFD500] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItemsInCart} items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-[#FFD500] font-bold text-xl"
              >
                ✕
              </button>
            </div>

            {/* Productos en Carrito */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-slate-400 space-y-2">
                  <p className="text-base font-semibold">Tu carrito está vacío</p>
                  <p className="text-xs">¡Agrega algunos sets para comenzar!</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="pt-4 flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{item.title}</h4>
                      <span className="text-xs font-bold text-[#E3000B]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Control de cantidad */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 bg-slate-200 hover:bg-slate-300 rounded font-bold text-xs flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 bg-slate-200 hover:bg-slate-300 rounded font-bold text-xs flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* BOTÓN ELIMINAR SI SE AGREGO POR ERROR */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      title="Eliminar producto"
                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg text-xs font-bold transition"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Carrito */}
            {cart.length > 0 && (
              <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-base font-black">
                  <span>Total:</span>
                  <span className="text-[#E3000B] text-xl">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    alert('¡Gracias por tu compra simulada!');
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-[#FFD500] hover:bg-amber-400 text-black font-black py-2.5 rounded-xl shadow transition text-center uppercase tracking-wider text-xs"
                >
                  Proceder al Pago
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>LEGO Store Oficial © 2026</span>
          <span>Demostración para proyectos React + Vite</span>
        </div>
      </footer>
    </div>
  );
}