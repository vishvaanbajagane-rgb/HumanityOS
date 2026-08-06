'use client';

import { useCallback, useState } from 'react';
import { apiClient } from '@/services/api-client';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  message: string;
  created_at?: string;
}

interface ChatMessageResponse {
  sessionId: string;
  reply: string;
  history: ChatMessage[];
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      setMessages((prev) => [...prev, { role: 'user', message: text }]);
      setIsSending(true);

      try {
        const { data } = await apiClient.post<ChatMessageResponse>('/chat/message', {
          message: text,
          session_id: sessionId,
          language: 'en',
        });
        setSessionId(data.sessionId);
        setMessages(data.history);
      } catch (err) {
        console.error('Chat send failed', err);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', message: 'Sorry, something went wrong reaching the assistant. Please try again.' },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [sessionId]
  );

  return { messages, sendMessage, isSending };
}