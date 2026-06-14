import React, { useMemo, useState } from 'react';
import { courses } from '../data/products.js';
import CourseCard from '../components/CourseCard.jsx';
import FiltersSidebar from '../components/FiltersSidebar.jsx';

export default function CoursesPage() {
  const [state, setState] = useState({ categories: [], priceType: 'all', sort: 'default' });

  // For courses we fake category list
  const categories = ['All Courses'];

  const filtered = useMemo(() => {
    let out = courses.slice();
    if (state.priceType === 'free') out = out.filter((c) => c.price === 0);
    if (state.priceType === 'paid') out = out.filter((c) => c.price > 0);
    if (state.sort === 'price_asc') out.sort((a, z) => a.price - z.price);
    if (state.sort === 'price_desc') out.sort((a, z) => z.price - a.price);
    if (state.sort === 'rating_desc') out.sort((a, z) => z.lessonsCount - a.lessonsCount);
    return out;
  }, [state]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6">
      <FiltersSidebar state={state} setState={setState} categories={categories} />
      <div className="flex-1">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-600">No courses found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
