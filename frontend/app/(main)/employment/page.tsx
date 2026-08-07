'use client';

import { useEffect, useState } from 'react';
import { Briefcase } from 'lucide-react';
import { apiClient } from '@/services/api-client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { JobCard, type JobItem } from '@/components/services/JobCard';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

const TYPE_FILTERS = [
  { value: '', label: 'All' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'daily-wage', label: 'Daily Wage' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

export default function EmploymentPage() {
  const [items, setItems] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (jobType) params.job_type = jobType;

    apiClient
      .get('/jobs', { params })
      .then(({ data }) => {
        if (!cancelled) setItems(data.items);
      })
      .catch((err) => console.error('Failed to load jobs', err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search, jobType]);

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-500/10">
          <Briefcase className="h-5 w-5 text-secondary-600" />
        </span>
        <div>
          <h1 className="text-2xl font-bold">Employment</h1>
          <p className="text-sm text-muted-foreground">Full-time, part-time, daily-wage, and remote opportunities</p>
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
          {TYPE_FILTERS.map((f) => (
            <Button
              key={f.value}
              type="button"
              variant={jobType === f.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setJobType(f.value)}
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
          No job listings found. Try a different search or filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <JobCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}