import { CalendarClock, ExternalLink, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface EducationItem {
  id: string;
  title: string;
  provider: string | null;
  category: string | null;
  description: string | null;
  eligibility: string | null;
  url: string | null;
  deadline: string | null;
}

const CATEGORY_LABELS: Record<string, string> = {
  scholarship: 'Scholarship',
  course: 'Course',
  'school-admission': 'School Admission',
  'vocational-training': 'Vocational Training',
  'literacy-program': 'Literacy Program',
};

function formatDeadline(deadline: string | null): string | null {
  if (!deadline) return null;
  const date = new Date(deadline);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function EducationCard({ item }: { item: EducationItem }) {
  const deadlineText = formatDeadline(item.deadline);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-500/10">
            <GraduationCap className="h-4 w-4 text-primary-600" />
          </span>
          <div>
            <h3 className="font-semibold leading-snug">{item.title}</h3>
            {item.provider && <p className="text-xs text-muted-foreground">{item.provider}</p>}
          </div>
        </div>
        {item.category && (
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {CATEGORY_LABELS[item.category] ?? item.category}
          </span>
        )}
      </div>

      {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}

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
        {item.url && (
          <Button asChild size="sm" variant="outline">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Learn More
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}