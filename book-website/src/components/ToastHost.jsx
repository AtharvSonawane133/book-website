import React from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function ToastHost() {
  const { toasts } = useStore();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="bg-gray-900 text-white px-4 py-2 rounded shadow">
          {t.message}
        </div>
      ))}
    </div>
  );
}
