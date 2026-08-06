'use client';

import { useEffect, useState } from 'react';
import { HeartPulse } from 'lucide-react';
import { apiClient } from '@/services/api-client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HealthcareCard, type HealthcareItem } from '@/components/services/HealthcareCard';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

const TYPE_FILTERS = [
  { value: '', label: 'All' },
  { value: 'hospital', label: 'Hospitals' },
  { value: 'clinic', label: 'Clinics' },
  { value: 'pharmacy', label: 'Pharmacies' },
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'diagnostic-lab', label: 'Diagnostic Labs' },
];

export default function HealthcarePage() {
  const [items, setItems] = useState<HealthcareItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (type) params.type = type;

    apiClient
      .get('/healthcare', { params })
      .then(({ data }) => {
        if (!cancelled) setItems(data.items);
      })
      .catch((err) => console.error('Failed to load healthcare directory', err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search, type]);

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
          <HeartPulse className="h-5 w-5 text-red-500" />
        </span>
        <div>
          <h1 className="text-2xl font-bold">Healthcare</h1>
          <p className="text-sm text-muted-foreground">Find hospitals, clinics, pharmacies, and mental health support</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map((f) => (
            <Button
              key={f.value}
              type="button"
              variant={type === f.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No healthcare facilities found. Try a different search or filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <HealthcareCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}