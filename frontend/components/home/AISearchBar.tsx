'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SUGGESTIONS = [
  'Find a free clinic near me',
  'Scholarships for college students',
  'How do I apply for unemployment benefits?',
  'Emergency shelters nearby',
];

export function AISearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/chat?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="-mt-8 px-2 sm:-mt-10">
      <form onSubmit={handleSubmit} className="glass-card relative mx-auto flex max-w-2xl items-center gap-2 p-2">
        <Sparkles className="ml-2 h-5 w-5 shrink-0 text-primary-500" aria-hidden="true" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask HumanityOS AI anything — healthcare, jobs, benefits..."
          aria-label="Ask HumanityOS AI"
          className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
        <Button type="button" variant="ghost" size="icon" aria-label="Voice search" className="shrink-0">
          <Mic className="h-4 w-4" />
        </Button>
        <Button type="submit" size="icon" aria-label="Search" className="shrink-0">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      <div className="mx-auto mt-3 flex max-w-2xl flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setQuery(s)}
            className="focus-ring rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}