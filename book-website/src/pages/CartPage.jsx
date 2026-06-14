import React from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { books, courses } from '../data/products.js';

function findItem(id) {
  return books.find((b) => b.id === id) || courses.find((c) => c.id === id) || null;
}

export default function CartPage() {
  const { cartItems, setQty, removeFromCart } = useStore();

  const rows = cartItems.map((it) => ({ ...it, info: findItem(it.id) }));

  const price = rows.reduce((s, r) => s + (r.info?.originalPrice || r.info?.price || 0) * r.qty, 0);
  const payableBeforeDelivery = rows.reduce((s, r) => s + (r.info?.price || 0) * r.qty, 0);
  const discount = price - payableBeforeDelivery;
  const delivery = payableBeforeDelivery >= 499 || payableBeforeDelivery === 0 ? 0 : 40;
  const total = payableBeforeDelivery + delivery;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {rows.length === 0 ? (
          <div className="p-6 text-gray-600">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {rows.map((r) => (
              <div key={r.id} className="flex gap-4 items-center border p-3 rounded bg-white">
                <img src={r.info?.image} alt={r.info?.title} className="w-20 h-24 object-cover" />
                <div className="flex-1">
                  <div className="font-semibold">{r.info?.title}</div>
                  <div className="text-sm text-gray-600">by {r.info?.author || r.info?.instructor}</div>
                  <div className="mt-2">₹{r.info?.price} x {r.qty}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setQty(r.id, r.qty - 1)} className="px-2 py-1 border rounded">-</button>
                    <div className="px-3">{r.qty}</div>
                    <button onClick={() => setQty(r.id, r.qty + 1)} className="px-2 py-1 border rounded">+</button>
                  </div>
                  <button onClick={() => removeFromCart(r.id)} className="text-sm text-red-600">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <aside className="border rounded p-4 bg-white">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <div className="flex justify-between"><div>Price</div><div>₹{price}</div></div>
        <div className="flex justify-between"><div>Discount</div><div>-₹{discount}</div></div>
        <div className="flex justify-between"><div>Delivery Charges</div><div>{delivery === 0 ? 'FREE' : `₹${delivery}`}</div></div>
        <div className="flex justify-between font-bold text-lg mt-2"><div>Total</div><div>₹{total}</div></div>
        <button onClick={() => alert('Payment successful! Order placed.')} className="w-full mt-4 bg-green-600 text-white py-2 rounded">Proceed to Pay via UPI / Cards</button>
      </aside>
    </div>
  );
}
