import { Phone, MapPin, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface HealthcareItem {
  id: string;
  name: string;
  type: string;
  services: string[];
  address: string | null;
  phone: string | null;
  is24x7: boolean;
  isFree: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  hospital: 'Hospital',
  clinic: 'Clinic',
  pharmacy: 'Pharmacy',
  'mental-health': 'Mental Health',
  'diagnostic-lab': 'Diagnostic Lab',
};

export function HealthcareCard({ item }: { item: HealthcareItem }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{TYPE_LABELS[item.type] ?? item.type}</p>
        </div>
        <div className="flex shrink-0 gap-1.5">
          {item.is24x7 && (
            <span className="rounded-full bg-secondary-500/10 px-2 py-0.5 text-[10px] font-medium text-secondary-700 dark:text-secondary-400">
              24/7
            </span>
          )}
          {item.isFree && (
            <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-[10px] font-medium text-primary-700 dark:text-primary-400">
              Free
            </span>
          )}
        </div>
      </div>

      {item.address && (
        <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {item.address}
        </p>
      )}

      {item.services.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.services.slice(0, 4).map((s) => (
            <span key={s} className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              <Stethoscope className="h-3 w-3" />
              {s}
            </span>
          ))}
        </div>
      )}

      {item.phone && (
        <Button asChild variant="outline" size="sm" className="mt-1 w-fit">
          <a href={`tel:${item.phone}`}>
            <Phone className="h-3.5 w-3.5" />
            {item.phone}
          </a>
        </Button>
      )}
    </div>
  );
}