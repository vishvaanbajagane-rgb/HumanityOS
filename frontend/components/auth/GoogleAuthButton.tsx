'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3.02h3.88c2.27-2.09 3.54-5.17 3.54-8.89z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.02c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.92H1.3v3.11A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.31 14.3a7.2 7.2 0 0 1 0-4.6V6.59H1.3a12 12 0 0 0 0 10.82z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.3 6.59l4.01 3.11C6.25 6.88 8.89 4.75 12 4.75z" />
    </svg>
  );
}

export function GoogleAuthButton() {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      router.push('/home');
    } catch {
      // error toast already handled in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="glass"
      size="lg"
      className="w-full text-foreground"
      onClick={handleClick}
      isLoading={isLoading}
    >
      {!isLoading && <GoogleIcon />}
      Continue with Google
    </Button>
  );
}