import React from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { ShoppingCart, Star } from 'lucide-react';

function formatRupee(v) {
  return v === 0 ? 'FREE' : `₹${v}`;
}

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, wishlistItems } = useStore();
  const saved = wishlistItems.some((w) => w.id === product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="relative group">
      {product.isBestseller && (
        <div className="absolute left-3 top-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-20">BESTSELLER</div>
      )}
      {product.price === 0 && (
        <div className="absolute left-3 top-3 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-20">FREE BOOK</div>
      )}

      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="aspect-3/4 bg-slate-50 flex items-center justify-center overflow-hidden rounded-t-2xl relative">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" onError={(e) => { const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(99,102,241);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(251,146,60);stop-opacity:1" /></linearGradient></defs><rect width="300" height="400" fill="url(%23bg)"/><text x="150" y="180" font-size="18" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial" text-length="90%">${product.title}</text><text x="150" y="260" font-size="14" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial">by ${product.author}</text></svg>`; e.target.src = 'data:image/svg+xml;utf8,' + svg; }} />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg leading-tight mb-1">{product.title}</h3>
          <div className="text-sm text-slate-500 mb-3">by {product.author}</div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold">{formatRupee(product.price)}</div>
              {product.price > 0 && product.originalPrice > product.price && (
                <div className="text-sm text-gray-400 line-through">₹{product.originalPrice}</div>
              )}
            </div>

            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button onClick={() => addToCart(product.id)} className="bg-indigo-600 text-white p-3 rounded-lg shadow hover:bg-indigo-700">
                <ShoppingCart size={16} />
              </button>
              <button onClick={() => addToWishlist(product.id)} className={`p-3 rounded-lg border ${saved ? 'bg-amber-50' : 'bg-white'}`}>
                <Star size={16} className="text-amber-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
