import { CalendarClock, ExternalLink, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface SchemeItem {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  eligibility: string | null;
  benefits: string | null;
  applicationUrl: string | null;
  region: string | null;
  country: string;
  deadline: string | null;
}

function formatDeadline(deadline: string | null): string | null {
  if (!deadline) return null;
  return new Date(deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function SchemeCard({ item }: { item: SchemeItem }) {
  const deadlineText = formatDeadline(item.deadline);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-500/10">
          <Landmark className="h-4 w-4 text-accent-600" />
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug">{item.title}</h3>
          <p className="text-xs text-muted-foreground">
            {item.region ? `${item.region}, ` : ''}
            {item.country}
          </p>
        </div>
      </div>

      {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}

      {item.benefits && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Benefits: </span>
          {item.benefits}
        </p>
      )}

      {item.eligibility && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Eligibility: </span>
          {item.eligibility}
        </p>
      )}

      <div className="mt-1 flex items-center justify-between">
        {deadlineText ? (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5" />
            Deadline: {deadlineText}
          </span>
        ) : (
          <span />
        )}
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