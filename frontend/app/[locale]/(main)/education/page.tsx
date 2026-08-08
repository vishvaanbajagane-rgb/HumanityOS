'use client';

import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { apiClient } from '@/services/api-client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EducationCard, type EducationItem } from '@/components/services/EducationCard';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

const CATEGORY_FILTERS = [
  { value: '', label: 'All' },
  { value: 'scholarship', label: 'Scholarships' },
  { value: 'course', label: 'Courses' },
  { value: 'school-admission', label: 'School Admission' },
  { value: 'vocational-training', label: 'Vocational Training' },
  { value: 'literacy-program', label: 'Literacy Programs' },
];

export default function EducationPage() {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (category) params.category = category;

    apiClient
      .get('/education', { params })
      .then(({ data }) => {
        if (!cancelled) setItems(data.items);
      })
      .catch((err) => console.error('Failed to load education directory', err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search, category]);

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10">
          <GraduationCap className="h-5 w-5 text-primary-600" />
        </span>
        <div>
          <h1 className="text-2xl font-bold">Education</h1>
          <p className="text-sm text-muted-foreground">Scholarships, courses, admissions, and training programs</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {CATEGORY_FILTERS.map((f) => (
            <Button
              key={f.value}
              type="button"
              variant={category === f.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategory(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-44 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No education opportunities found. Try a different search or filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}