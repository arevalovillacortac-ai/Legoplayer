import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#E3000B] border border-[#FFD500] rounded-md flex items-center justify-center text-white font-black text-xl">
                LEGO
              </div>
              <span className="text-white font-black text-lg tracking-wide">STORE ONLINE</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspirando a los constructores del mañana. Sets auténticos, colecciones para adultos y exclusivas mundiales.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Atención al Cliente</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-amber-400">Estado del Pedido</a></li>
              <li><a href="#" className="hover:text-amber-400">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-amber-400">Piezas Faltantes</a></li>
              <li><a href="#" className="hover:text-amber-400">Instrucciones de Construcción</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Temas Destacados</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-amber-400">Star Wars™ Ultimate Collector</a></li>
              <li><a href="#" className="hover:text-amber-400">LEGO® Technic Supercars</a></li>
              <li><a href="#" className="hover:text-amber-400">LEGO® Botanical Collection</a></li>
              <li><a href="#" className="hover:text-amber-400">Harry Potter™ Hogwarts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Garantía LEGO</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <span className="text-amber-400">✔</span> Sets 100% Originales y Sellados
              </p>
              <p className="flex items-center gap-2">
                <span className="text-amber-400">✔</span> Envío seguro con empaque acolchado
              </p>
              <p className="flex items-center gap-2">
                <span className="text-amber-400">✔</span> Puntos LEGO VIP en cada compra
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} LEGO Group Fansite. Proyecto de catálogo interactivo para fans y coleccionistas.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:underline">Privacidad</a>
            <a href="#" className="hover:underline">Cookies</a>
            <a href="#" className="hover:underline">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}