'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { quickActionLinks } from '@/config/site';

export function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-heading">
      <h2 id="quick-actions-heading" className="mb-4 text-lg font-semibold">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickActionLinks.map(({ href, label, icon: Icon, color, bg }, i) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
          >
            <Link
              href={href}
              className="focus-ring group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
              </span>
              <span className="text-xs font-medium text-foreground">{label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}