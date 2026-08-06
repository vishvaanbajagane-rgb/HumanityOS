'use client';

import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { ChatBubble } from '@/components/chat/ChatBubble';
import type { ChatMessage } from '@/hooks/useChat';

interface ChatWindowProps {
  messages: ChatMessage[];
  isSending: boolean;
}

export function ChatWindow({ messages, isSending }: ChatWindowProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="gradient-brand flex h-14 w-14 items-center justify-center rounded-2xl">
          <Sparkles className="h-7 w-7 text-white" />
        </span>
        <div>
          <p className="font-semibold">Ask HumanityOS AI anything</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Healthcare, education, government schemes, jobs, or emergency help — I&apos;m here to point you in the
            right direction.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
      {messages.map((m, i) => (
        <ChatBubble key={i} message={m} />
      ))}
      {isSending && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-primary-400" />
          HumanityOS AI is typing...
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}