'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { VoiceInput } from '@/components/chat/VoiceInput';

interface ChatInputProps {
  onSend: (text: string) => void;
  isSending: boolean;
}

export function ChatInput({ onSend, isSending }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isSending) return;
    onSend(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border bg-background p-3">
      <VoiceInput onResult={(text) => text && setValue((prev) => (prev ? `${prev} ${text}` : text))} />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your question..."
        aria-label="Chat message"
        disabled={isSending}
        className="flex-1"
      />
      <Button type="submit" size="icon" isLoading={isSending} disabled={!value.trim()} aria-label="Send message">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}