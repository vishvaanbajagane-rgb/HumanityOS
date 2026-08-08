'use client';

import { useEffect, useState } from 'react';
import { Phone, ShieldAlert, Siren } from 'lucide-react';
import { apiClient } from '@/services/api-client';
import { Button } from '@/components/ui/button';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

interface DisasterContact {
  id: string;
  name: string;
  category: string;
  phone: string;
  region: string | null;
  country: string;
  isNational: boolean;
}

export default function DisasterAlertsPage() {
  const [items, setItems] = useState<DisasterContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    apiClient
      .get('/emergency', { params: { category: 'disaster-response' } })
      .then(({ data }) => {
        if (!cancelled) setItems(data.items);
      })
      .catch((err) => console.error('Failed to load disaster response contacts', err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10">
          <Siren className="h-5 w-5 text-yellow-600" />
        </span>
        <div>
          <h1 className="text-2xl font-bold">Disaster Alerts</h1>
          <p className="text-sm text-muted-foreground">Disaster response contacts and preparedness resources</p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-4">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
        <p className="text-sm text-foreground">
          During an active disaster, follow guidance from local authorities first. These contacts connect you to
          disaster response coordination in your region.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No disaster response contacts found for your region yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {item.region ? `${item.region}, ` : ''}
                  {item.country}
                  {item.isNational ? ' · National' : ''}
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="mt-1 w-fit">
                <a href={`tel:${item.phone}`}>
                  <Phone className="h-3.5 w-3.5" />
                  {item.phone}
                </a>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}