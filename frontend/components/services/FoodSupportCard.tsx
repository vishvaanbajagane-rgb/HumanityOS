import { Phone, MapPin, Clock, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FoodSupportItem {
  id: string;
  name: string;
  type: string;
  address: string | null;
  phone: string | null;
  schedule: string | null;
  eligibility: string | null;
  isFree: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  'food-bank': 'Food Bank',
  'soup-kitchen': 'Soup Kitchen',
  'meal-delivery': 'Meal Delivery',
  'grocery-assistance': 'Grocery Assistance',
};

export function FoodSupportCard({ item }: { item: FoodSupportItem }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
            <Utensils className="h-4 w-4 text-orange-500" />
          </span>
          <div>
            <h3 className="font-semibold leading-snug">{item.name}</h3>
            <p className="text-xs text-muted-foreground">{TYPE_LABELS[item.type] ?? item.type}</p>
          </div>
        </div>
        {item.isFree && (
          <span className="shrink-0 rounded-full bg-primary-500/10 px-2 py-0.5 text-[10px] font-medium text-primary-700 dark:text-primary-400">
            Free
          </span>
        )}
      </div>

      {item.address && (
        <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {item.address}
        </p>
      )}

      {item.schedule && (
        <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {item.schedule}
        </p>
      )}

      {item.eligibility && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Eligibility: </span>
          {item.eligibility}
        </p>
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