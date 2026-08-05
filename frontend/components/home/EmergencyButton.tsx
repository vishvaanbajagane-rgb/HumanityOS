'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmergencyButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Emergency help"
        className="focus-ring fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg shadow-destructive/30 transition-transform hover:scale-105 active:scale-95"
      >
        <AlertTriangle className="h-6 w-6" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="emergency-dialog-title"
        >
          <div className="glass-card w-full max-w-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h2 id="emergency-dialog-title" className="text-lg font-semibold">
                  Emergency Help
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="focus-ring rounded text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              If you are in immediate danger, contact local emergency services right away.
            </p>

            <div className="mt-5 space-y-2">
              <Button asChild variant="destructive" size="lg" className="w-full">
                <a href="tel:112">
                  <Phone className="h-4 w-4" />
                  Call Emergency Services (112)
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/emergency" onClick={() => setOpen(false)}>
                  View All Emergency Contacts
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}