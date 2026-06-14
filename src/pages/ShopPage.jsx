import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { books } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import FiltersSidebar from '../components/FiltersSidebar.jsx';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ShopPage() {
  const q = useQuery().get('q') || '';
  const [state, setState] = useState({ categories: [], priceType: 'all', sort: 'default' });

  const categories = Array.from(new Set(books.map((b) => b.category)));

  const filtered = useMemo(() => {
    let out = books.slice();
    if (q) {
      const lk = q.toLowerCase();
      out = out.filter((b) => b.title.toLowerCase().includes(lk) || b.author.toLowerCase().includes(lk));
    }
    if (state.categories.length) out = out.filter((b) => state.categories.includes(b.category));
    if (state.priceType === 'free') out = out.filter((b) => b.price === 0);
    if (state.priceType === 'paid') out = out.filter((b) => b.price > 0);
    if (state.sort === 'price_asc') out.sort((a, z) => a.price - z.price);
    if (state.sort === 'price_desc') out.sort((a, z) => z.price - a.price);
    if (state.sort === 'rating_desc') out.sort((a, z) => z.rating - a.rating);
    return out;
  }, [q, state]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6">
      <FiltersSidebar state={state} setState={setState} categories={categories} />
      <div className="flex-1">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-600">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((b) => (
              <ProductCard key={b.id} product={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
