import { MapPin, Wallet, ExternalLink, Briefcase, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface JobItem {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  location: string | null;
  salaryRange: string | null;
  jobType: string | null;
  isRemote: boolean;
  applicationUrl: string | null;
  postedAt: string | null;
}

const JOB_TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'daily-wage': 'Daily Wage',
  contract: 'Contract',
  internship: 'Internship',
};

function timeAgo(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function JobCard({ item }: { item: JobItem }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary-500/10">
            <Briefcase className="h-4 w-4 text-secondary-600" />
          </span>
          <div>
            <h3 className="font-semibold leading-snug">{item.title}</h3>
            {item.category && <p className="text-xs text-muted-foreground">{item.category}</p>}
          </div>
        </div>
        {item.jobType && (
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {JOB_TYPE_LABELS[item.jobType] ?? item.jobType}
          </span>
        )}
      </div>

      {item.description && <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>}

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {item.location && (
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {item.location}
          </span>
        )}
        {item.isRemote && (
          <span className="flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            Remote
          </span>
        )}
        {item.salaryRange && (
          <span className="flex items-center gap-1">
            <Wallet className="h-3.5 w-3.5" />
            {item.salaryRange}
          </span>
        )}
      </div>

      <div className="mt-1 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{timeAgo(item.postedAt)}</span>
        {item.applicationUrl && (
          <Button asChild size="sm" variant="outline">
            <a href={item.applicationUrl} target="_blank" rel="noopener noreferrer">
              Apply
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}