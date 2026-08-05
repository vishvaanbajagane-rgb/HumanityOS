
'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function HeroSection() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0];

  return (
    <section className="relative overflow-hidden rounded-3xl gradient-brand px-6 py-14 text-white sm:px-12 sm:py-20">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl"
      >
        <p className="text-sm font-medium text-white/80">
          {getGreeting()}{firstName ? `, ${firstName}` : ''} 👋
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          What support are you looking for today?
        </h1>
        <p className="mt-4 max-w-xl text-white/85">
          Healthcare, education, jobs, government schemes, and emergency help — all in one place, powered by AI.
        </p>
      </motion.div>
    </section>
  );
}