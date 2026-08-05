'use client';

import { motion } from 'framer-motion';
import { Users, HeartHandshake, Building2, Globe2 } from 'lucide-react';

// NOTE: Static placeholder figures. Will be wired to GET /api/v1/analytics/global
// once the analytics module is built.
const STATS = [
  { icon: Users, value: '128K+', label: 'People Helped' },
  { icon: HeartHandshake, value: '3,400+', label: 'Volunteers Active' },
  { icon: Building2, value: '860+', label: 'Partner Organizations' },
  { icon: Globe2, value: '42', label: 'Countries Reached' },
];

export function GlobalStats() {
  return (
    <section aria-labelledby="global-stats-heading" className="rounded-3xl border border-border bg-muted/40 p-6 sm:p-8">
      <h2 id="global-stats-heading" className="mb-6 text-center text-lg font-semibold">
        Our Global Impact
      </h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {STATS.map(({ icon: Icon, value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="flex flex-col items-center text-center"
          >
            <span className="gradient-brand mb-2 flex h-11 w-11 items-center justify-center rounded-xl">
              <Icon className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}