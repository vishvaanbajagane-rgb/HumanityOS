'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { HeartHandshake, Mail, UserRound } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AuthBackground } from '@/components/auth/AuthBackground';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { LoginForm } from '@/components/auth/LoginForm';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const { continueAsGuest } = useAuth();
  const router = useRouter();
  const [guestLoading, setGuestLoading] = useState(false);

  const handleGuest = async () => {
    setGuestLoading(true);
    try {
      await continueAsGuest();
      router.push('/home');
    } catch {
      // toast handled in context
    } finally {
      setGuestLoading(false);
    }
  };

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
            <CardTitle className="gradient-text text-3xl">HumanityOS</CardTitle>
            <CardDescription className="text-base">
              One Intelligent Platform for Every Human Need
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <AnimatePresence mode="wait">
              {!showEmailForm ? (
                <motion.div
                  key="options"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <GoogleAuthButton />

                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => setShowEmailForm(true)}
                  >
                    <Mail className="h-4 w-4" />
                    Continue with Email
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    className="w-full"
                    onClick={handleGuest}
                    isLoading={guestLoading}
                  >
                    {!guestLoading && <UserRound className="h-4 w-4" />}
                    Continue as Guest
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="email-form"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <LoginForm />
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="focus-ring mt-4 w-full rounded text-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    ← Back to all sign-in options
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-white/80 drop-shadow-sm">
          By continuing, you agree to HumanityOS&apos;s Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </>
  );
}