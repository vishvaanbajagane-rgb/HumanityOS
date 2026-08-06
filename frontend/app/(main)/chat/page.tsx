'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatInput } from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';

export default function ChatPage() {
  const { messages, sendMessage, isSending } = useChat();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  const hasAutoSent = useRef(false);

  useEffect(() => {
    if (initialQuery && !hasAutoSent.current) {
      hasAutoSent.current = true;
      sendMessage(initialQuery);
    }
  }, [initialQuery, sendMessage]);

  return (
    <div className="container flex h-[calc(100vh-4rem)] max-w-3xl flex-col py-4">
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <ChatWindow messages={messages} isSending={isSending} />
        <ChatInput onSend={sendMessage} isSending={isSending} />
      </div>
    </div>
  );
}