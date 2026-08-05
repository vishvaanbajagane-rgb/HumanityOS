import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return <div className={cn('skeleton rounded-xl bg-muted', className)} aria-hidden="true" />;
}

export function HomePageSkeleton() {
  return (
    <div className="container space-y-8 py-8">
      <LoadingSkeleton className="h-48 w-full rounded-3xl" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <LoadingSkeleton key={i} className="h-24 w-full" />
        ))}
      </div>
      <LoadingSkeleton className="h-64 w-full rounded-3xl" />
    </div>
  );
}