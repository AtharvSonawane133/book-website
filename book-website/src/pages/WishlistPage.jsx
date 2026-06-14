import React from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { books, courses } from '../data/products.js';

function findItem(id) {
  return books.find((b) => b.id === id) || courses.find((c) => c.id === id) || null;
}

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, moveWishlistToCart } = useStore();
  const items = wishlistItems.map((w) => ({ ...w, info: findItem(w.id) }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      {items.length === 0 ? (
        <div className="text-gray-600">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.id} className="border p-3 rounded bg-white">
              <img src={it.info?.image} alt={it.info?.title} className="w-full h-40 object-cover mb-2" />
              <div className="font-semibold">{it.info?.title}</div>
              <div className="text-sm text-gray-600">by {it.info?.author || it.info?.instructor}</div>
              <div className="mt-2 flex gap-2">
                <button onClick={() => moveWishlistToCart(it.id)} className="flex-1 bg-blue-600 text-white py-2 rounded">Move to cart</button>
                <button onClick={() => removeFromWishlist(it.id)} className="px-3 py-2 border rounded">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
