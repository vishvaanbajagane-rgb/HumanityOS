-- =====================================================================
-- 0004_community.sql
-- organizations, jobs, volunteers, notifications, languages
-- =====================================================================

create table if not exists public.languages (
  code          varchar(8) primary key,     -- 'en', 'hi', 'ta', ...
  name          varchar(64) not null,
  native_name   varchar(64) not null,
  is_rtl        boolean not null default false
);

insert into public.languages (code, name, native_name, is_rtl) values
  ('en', 'English', 'English', false),
  ('hi', 'Hindi', 'हिन्दी', false),
  ('ta', 'Tamil', 'தமிழ்', false),
  ('te', 'Telugu', 'తెలుగు', false),
  ('es', 'Spanish', 'Español', false),
  ('fr', 'French', 'Français', false),
  ('ar', 'Arabic', 'العربية', true),
  ('zh', 'Chinese', '中文', false),
  ('ja', 'Japanese', '日本語', false),
  ('de', 'German', 'Deutsch', false),
  ('it', 'Italian', 'Italiano', false),
  ('pt', 'Portuguese', 'Português', false),
  ('ru', 'Russian', 'Русский', false)
on conflict (code) do nothing;

create table if not exists public.organizations (
  id            uuid primary key default uuid_generate_v4(),
  name          varchar(255) not null,
  description   text,
  category      varchar(32) not null check (
                  category in ('ngo', 'government', 'hospital', 'school', 'shelter', 'other')
                ),
  website       varchar(512),
  phone         varchar(32),
  email         varchar(320),
  address       text,
  latitude      double precision,
  longitude     double precision,
  verified      boolean not null default false,
  created_at    timestamptz not null default now()
);

create index if not exists idx_organizations_category on public.organizations (category);
create index if not exists idx_organizations_name_trgm on public.organizations using gin (name gin_trgm_ops);

create table if not exists public.jobs (
  id                uuid primary key default uuid_generate_v4(),
  organization_id   uuid references public.organizations (id) on delete set null,
  title             varchar(255) not null,
  description       text,
  category          varchar(64),
  location          varchar(255),
  salary_range      varchar(100),
  job_type          varchar(32) check (job_type in ('full-time', 'part-time', 'daily-wage', 'contract', 'internship')),
  is_remote         boolean not null default false,
  application_url   varchar(1024),
  posted_at         timestamptz not null default now(),
  expires_at        timestamptz
);

create index if not exists idx_jobs_organization_id on public.jobs (organization_id);
create index if not exists idx_jobs_category on public.jobs (category);
create index if not exists idx_jobs_posted_at on public.jobs (posted_at desc);

create table if not exists public.volunteers (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references public.users (id) on delete cascade,
  organization_id   uuid references public.organizations (id) on delete set null,
  skills            text[] default '{}',
  cause_areas       text[] default '{}',
  availability      varchar(64),                 -- 'weekends' | 'evenings' | 'flexible' ...
  is_active         boolean not null default true,
  created_at        timestamptz not null default now(),
  unique (user_id, organization_id)
);

create index if not exists idx_volunteers_user_id on public.volunteers (user_id);
create index if not exists idx_volunteers_organization_id on public.volunteers (organization_id);

create table if not exists public.notifications (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.users (id) on delete cascade,
  title         varchar(255) not null,
  body          text,
  type          varchar(32) not null default 'info' check (
                  type in ('info', 'emergency', 'reminder', 'update', 'recommendation')
                ),
  is_read       boolean not null default false,
  action_url    varchar(1024),
  created_at    timestamptz not null default now()
);

create index if not exists idx_notifications_user_id on public.notifications (user_id);
create index if not exists idx_notifications_is_read on public.notifications (user_id, is_read);