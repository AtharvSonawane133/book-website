import React from 'react';

export default function FiltersSidebar({ state, setState, categories }) {
  function toggleCategory(cat) {
    const next = new Set(state.categories);
    if (next.has(cat)) next.delete(cat); else next.add(cat);
    setState({ ...state, categories: Array.from(next) });
  }

  return (
    <aside className="w-60 p-4 border rounded bg-white">
      <h4 className="font-semibold mb-2">Filters</h4>
      <div className="mb-4">
        <div className="font-medium">Category</div>
        {categories.map((c) => (
          <label key={c} className="flex items-center gap-2 text-sm mt-2">
            <input type="checkbox" checked={state.categories.includes(c)} onChange={() => toggleCategory(c)} />
            {c}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <div className="font-medium">Price</div>
        <select
          value={state.priceType}
          onChange={(e) => setState({ ...state, priceType: e.target.value })}
          className="w-full mt-2 border rounded px-2 py-1">
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div>
        <div className="font-medium">Sort</div>
        <select
          value={state.sort}
          onChange={(e) => setState({ ...state, sort: e.target.value })}
          className="w-full mt-2 border rounded px-2 py-1">
          <option value="default">Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating_desc">Rating</option>
        </select>
      </div>
    </aside>
  );
}
