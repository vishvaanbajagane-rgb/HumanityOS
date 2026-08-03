-- =====================================================================
-- 0002_core_users.sql
-- users, profiles, user_preferences
-- =====================================================================

create table if not exists public.users (
  id              uuid primary key default uuid_generate_v4(),
  firebase_uid    varchar(128) not null unique,
  name            varchar(255),
  email           varchar(320) unique,
  photo_url       varchar(1024),
  is_guest        boolean not null default false,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  last_login      timestamptz not null default now()
);

create index if not exists idx_users_firebase_uid on public.users (firebase_uid);
create index if not exists idx_users_email on public.users (email);

create table if not exists public.profiles (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null unique references public.users (id) on delete cascade,
  preferred_language  varchar(8) not null default 'en',
  country             varchar(100),
  phone               varchar(32),
  bio                 text,
  updated_at          timestamptz not null default now()
);

create index if not exists idx_profiles_user_id on public.profiles (user_id);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create table if not exists public.user_preferences (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null unique references public.users (id) on delete cascade,
  notification_email  boolean not null default true,
  notification_push   boolean not null default true,
  theme               varchar(10) not null default 'light' check (theme in ('light', 'dark')),
  high_contrast       boolean not null default false,
  large_text          boolean not null default false,
  updated_at          timestamptz not null default now()
);

drop trigger if exists trg_user_preferences_updated_at on public.user_preferences;
create trigger trg_user_preferences_updated_at
  before update on public.user_preferences
  for each row execute function public.set_updated_at();