'use client';

import { Sparkles, HeartPulse, GraduationCap, Briefcase } from 'lucide-react';

// NOTE: Static placeholder data. Will be wired to GET /api/v1/recommendations
// once the AI recommendation engine module is built.
const RECOMMENDATIONS = [
  {
    icon: HeartPulse,
    title: 'Free health checkup camp this weekend',
    description: 'A community health camp is running near your area — general checkups, no cost.',
    tag: 'Healthcare',
  },
  {
    icon: GraduationCap,
    title: 'Scholarship applications closing soon',
    description: 'Merit-based scholarships for undergraduate students — deadline in 12 days.',
    tag: 'Education',
  },
  {
    icon: Briefcase,
    title: '3 new job openings match your profile',
    description: 'Entry-level positions in retail and logistics, posted this week.',
    tag: 'Employment',
  },
];

export function RecommendationsFeed() {
  return (
    <section aria-labelledby="recommendations-heading">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary-500" />
        <h2 id="recommendations-heading" className="text-lg font-semibold">
          Recommended for You
        </h2>
      </div>

      <div className="space-y-3">
        {RECOMMENDATIONS.map(({ icon: Icon, title, description, tag }) => (
          <div
            key={title}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/10">
              <Icon className="h-5 w-5 text-primary-600" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-sm font-semibold">{title}</h3>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {tag}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}