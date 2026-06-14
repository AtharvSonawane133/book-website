import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, BookOpen, User } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';

export default function SiteHeader() {
  const nav = useNavigate();
  const { cartCount, wishlistCount } = useStore();
  const [q, setQ] = useState('');

  function doSearch(e) {
    e.preventDefault();
    nav(`/shop?q=${encodeURIComponent(q)}`);
  }

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="relative px-3 py-2 text-sm font-medium text-slate-700 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-indigo-600 after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100">
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-indigo-600 to-amber-400 flex items-center justify-center shadow">
            <BookOpen className="text-white" size={18} />
          </div>
          <Link to="/" className="text-2xl font-extrabold text-indigo-900 tracking-tight">GranthAlaya</Link>
        </div>

        <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <div className="flex-1 md:flex md:justify-center">
          <form onSubmit={doSearch} className="max-w-xl w-full">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={18} />
              </div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search books, authors, courses..."
                className="w-full rounded-full pl-10 pr-4 py-2 bg-white/70 border border-gray-200 placeholder:text-slate-400 focus:outline-none focus-within:ring-2 focus-within:ring-indigo-500 transition"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/wishlist" className="relative">
            <div className="p-2 rounded-full hover:bg-slate-100 transition">
              <Heart size={18} />
            </div>
            {wishlistCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{wishlistCount}</div>
            )}
          </Link>

          <Link to="/cart" className="relative">
            <div className="p-2 rounded-full hover:bg-slate-100 transition">
              <ShoppingCart size={18} />
            </div>
            {cartCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</div>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <User size={16} />
            </div>
            <Link to="/login" className="text-sm text-slate-700">Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
