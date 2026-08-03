'use client';

import { motion } from 'framer-motion';
import { HeartPulse, GraduationCap, HandHeart, ShieldCheck } from 'lucide-react';

const floatingCards = [
  { icon: HeartPulse, label: 'Healthcare', top: '12%', left: '8%', delay: 0 },
  { icon: GraduationCap, label: 'Education', top: '68%', left: '10%', delay: 0.6 },
  { icon: HandHeart, label: 'Volunteers', top: '20%', left: '85%', delay: 1.1 },
  { icon: ShieldCheck, label: 'Emergency Aid', top: '72%', left: '82%', delay: 1.6 },
];

export function AuthBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 gradient-brand bg-200% animate-gradient-shift opacity-90 dark:opacity-80" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent-400/40 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary-400/40 blur-3xl" />
      <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-300/30 blur-3xl" />

      {floatingCards.map(({ icon: Icon, label, top, left, delay }) => (
        <motion.div
          key={label}
          className="glass absolute hidden items-center gap-2 rounded-2xl px-4 py-3 text-white shadow-lg md:flex"
          style={{ top, left }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}