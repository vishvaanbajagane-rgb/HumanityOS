-- =====================================================================
-- 0003_ai_chat.sql
-- chat_history, ai_logs, documents (OCR / uploaded files)
-- =====================================================================

create table if not exists public.chat_history (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references public.users (id) on delete cascade,
  session_id    uuid not null default uuid_generate_v4(),
  role          varchar(16) not null check (role in ('user', 'assistant', 'system')),
  message       text not null,
  language      varchar(8) default 'en',
  metadata      jsonb default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

create index if not exists idx_chat_history_user_id on public.chat_history (user_id);
create index if not exists idx_chat_history_session_id on public.chat_history (session_id);
create index if not exists idx_chat_history_created_at on public.chat_history (created_at desc);

create table if not exists public.ai_logs (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references public.users (id) on delete set null,
  feature           varchar(32) not null check (
                      feature in ('chat', 'ocr', 'translation', 'recommendation', 'emergency', 'stt', 'tts', 'summarization')
                    ),
  provider          varchar(32),                    -- 'openai' | 'gemini'
  request_payload   jsonb,
  response_payload  jsonb,
  tokens_used       integer,
  latency_ms        integer,
  success           boolean not null default true,
  error_message     text,
  created_at        timestamptz not null default now()
);

create index if not exists idx_ai_logs_user_id on public.ai_logs (user_id);
create index if not exists idx_ai_logs_feature on public.ai_logs (feature);
create index if not exists idx_ai_logs_created_at on public.ai_logs (created_at desc);

create table if not exists public.documents (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.users (id) on delete cascade,
  file_name     varchar(255) not null,
  file_url      varchar(1024) not null,              -- Supabase Storage path/URL
  file_type     varchar(64),
  category      varchar(64),                          -- 'id-proof' | 'medical-record' | 'certificate' ...
  ocr_text      text,
  uploaded_at   timestamptz not null default now()
);

create index if not exists idx_documents_user_id on public.documents (user_id);