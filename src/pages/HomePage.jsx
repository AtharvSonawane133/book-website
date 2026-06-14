import React, { useMemo, useState } from 'react';
import { books } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import CourseCard from '../components/CourseCard.jsx';

export default function HomePage() {
  const [activeCat, setActiveCat] = useState('All');
  const categories = useMemo(() => ['All', ...Array.from(new Set(books.map((b) => b.category)))], []);

  const filtered = useMemo(() => {
    if (activeCat === 'All') return books;
    return books.filter((b) => b.category === activeCat);
  }, [activeCat]);

  const freeBooks = books.filter((b) => b.price === 0);
  const bests = books.filter((b) => b.isBestseller);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-8 items-center mb-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Unlock the Vault of <span className="bg-linear-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">Knowledge</span>
          </h1>
          <p className="text-slate-600 max-w-xl">From academic excellence to timeless Indian literature, explore thousands of books and digital courses at your fingertips.</p>
          <div className="flex items-center gap-4">
            <a href="/shop" className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">Explore Bookstore</a>
            <a href="/courses" className="bg-white border border-slate-200 px-5 py-3 rounded-lg hover:shadow-md transition">View Free Courses</a>
          </div>
          <div className="mt-6 flex gap-4">
            <div className="flex items-center gap-3 bg-indigo-50 p-4 rounded-lg">🚚 <div className="text-sm">Free Pan-India Shipping</div></div>
            <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-lg">⚡ <div className="text-sm">Instant UPI Payments</div></div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-10 -top-8 w-56 h-56 bg-amber-100 rounded-full filter blur-3xl opacity-30" />
          <div className="bg-linear-to-br from-white to-amber-50 rounded-3xl p-6 shadow-xl">
            <img src="/images/hero.jpg" alt="Modern bookstore with open books" className="rounded-2xl w-full h-96 object-cover" onError={(e) => { e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(79,70,229);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(251,146,60);stop-opacity:1" /></linearGradient></defs><rect width="800" height="600" fill="url(%23grad)"/><text x="400" y="280" font-size="48" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">GranthAlaya Library</text><text x="400" y="340" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial">Your Reading Companion</text></svg>'; }} />
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="mb-6">
        <div className="flex gap-3 overflow-x-auto py-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setActiveCat(c)} className={`whitespace-nowrap px-4 py-2 rounded-full ${activeCat===c? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((b) => (
            <ProductCard key={b.id} product={b} />
          ))}
        </div>
      </section>

      {/* Free Reading and Bestsellers */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Free Reading Zone</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {freeBooks.map((b) => (
            <ProductCard key={b.id} product={b} />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Bestsellers & Hot Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {bests.map((b) => (
            <ProductCard key={b.id} product={b} />
          ))}
        </div>
      </section>
    </div>
  );
}
