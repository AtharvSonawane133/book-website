import React from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { PlayCircle } from 'lucide-react';

function formatRupee(v) {
  return v === 0 ? 'FREE' : `₹${v}`;
}

export default function CourseCard({ course }) {
  const { addToCart } = useStore();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="h-44 bg-linear-to-br from-amber-50 to-indigo-50 flex items-center justify-center overflow-hidden relative">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" onError={(e) => { const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><defs><linearGradient id="cbg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(59,130,246);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(168,85,247);stop-opacity:1" /></linearGradient></defs><rect width="400" height="250" fill="url(%23cbg)"/><text x="200" y="110" font-size="20" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial" text-length="90%">${course.title}</text><text x="200" y="160" font-size="14" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial">by ${course.instructor}</text></svg>`; e.target.src = 'data:image/svg+xml;utf8,' + svg; }} />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
        <div className="text-sm text-slate-500 mb-3">{course.instructor} · {course.lessonsCount} lessons</div>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">{formatRupee(course.price)}</div>
          <button onClick={() => addToCart(course.id)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
            <PlayCircle size={16} /> Enroll
          </button>
        </div>
      </div>
    </div>
  );
}
