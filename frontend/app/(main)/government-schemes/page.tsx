'use client';

import { useEffect, useState } from 'react';
import { Landmark } from 'lucide-react';
import { apiClient } from '@/services/api-client';
import { Input } from '@/components/ui/input';
import { SchemeCard, type SchemeItem } from '@/components/services/SchemeCard';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

export default function GovernmentSchemesPage() {
  const [items, setItems] = useState<SchemeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const params: Record<string, string> = {};
    if (search) params.search = search;

    apiClient
      .get('/government-schemes', { params })
      .then(({ data }) => {
        if (!cancelled) setItems(data.items);
      })
      .catch((err) => console.error('Failed to load government schemes', err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search]);

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10">
          <Landmark className="h-5 w-5 text-accent-600" />
        </span>
        <div>
          <h1 className="text-2xl font-bold">Government Schemes</h1>
          <p className="text-sm text-muted-foreground">Benefits, subsidies, and public welfare programs</p>
        </div>
      </div>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title..."
        className="sm:max-w-xs"
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-44 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No government schemes found. Try a different search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <SchemeCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}