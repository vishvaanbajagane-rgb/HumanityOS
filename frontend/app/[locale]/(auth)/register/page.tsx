'use client';

import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AuthBackground } from '@/components/auth/AuthBackground';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export default function RegisterPage() {
  return (
    <>
      <AuthBackground />

      <div className="absolute right-4 top-4 z-10 md:right-8 md:top-8">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="z-10 w-full max-w-md"
      >
        <Card className="glass-card border-white/40 dark:border-white/10">
          <CardHeader className="items-center text-center">
            <div className="gradient-brand mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg">
              <HeartHandshake className="h-7 w-7 text-white" />
            </div>
            <CardTitle className="gradient-text text-3xl">Create your account</CardTitle>
            <CardDescription className="text-base">
              Join HumanityOS and get connected to the support you need
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-white/80 drop-shadow-sm">
          By continuing, you agree to HumanityOS&apos;s Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </>
  );
}