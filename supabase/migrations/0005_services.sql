-- =====================================================================
-- 0005_services.sql
-- healthcare, education, emergency, government_schemes, saved_resources, analytics
-- =====================================================================

create table if not exists public.healthcare (
  id                uuid primary key default uuid_generate_v4(),
  organization_id   uuid references public.organizations (id) on delete set null,
  name              varchar(255) not null,
  type              varchar(32) not null check (type in ('hospital', 'clinic', 'pharmacy', 'mental-health', 'diagnostic-lab')),
  services          text[] default '{}',
  address           text,
  latitude          double precision,
  longitude         double precision,
  phone             varchar(32),
  is_24x7           boolean not null default false,
  is_free            boolean not null default false,
  created_at        timestamptz not null default now()
);

create index if not exists idx_healthcare_type on public.healthcare (type);
create index if not exists idx_healthcare_org on public.healthcare (organization_id);

create table if not exists public.education (
  id                uuid primary key default uuid_generate_v4(),
  organization_id   uuid references public.organizations (id) on delete set null,
  title             varchar(255) not null,
  provider          varchar(255),
  category          varchar(32) check (category in ('scholarship', 'course', 'school-admission', 'vocational-training', 'literacy-program')),
  description       text,
  eligibility       text,
  url               varchar(1024),
  deadline          timestamptz,
  created_at        timestamptz not null default now()
);

create index if not exists idx_education_category on public.education (category);
create index if not exists idx_education_deadline on public.education (deadline);

create table if not exists public.emergency (
  id            uuid primary key default uuid_generate_v4(),
  name          varchar(255) not null,
  category      varchar(32) not null check (
                  category in ('police', 'fire', 'ambulance', 'disaster-response', 'womens-helpline', 'child-helpline', 'mental-health-crisis')
                ),
  phone         varchar(32) not null,
  region        varchar(100),
  country       varchar(100) not null,
  is_national   boolean not null default true
);

create index if not exists idx_emergency_country on public.emergency (country);
create index if not exists idx_emergency_category on public.emergency (category);

create table if not exists public.government_schemes (
  id                uuid primary key default uuid_generate_v4(),
  title             varchar(255) not null,
  description       text,
  category          varchar(64),
  eligibility       text,
  benefits          text,
  application_url   varchar(1024),
  region            varchar(100),
  country           varchar(100) not null,
  deadline          timestamptz,
  created_at        timestamptz not null default now()
);

create index if not exists idx_schemes_country on public.government_schemes (country);
create index if not exists idx_schemes_category on public.government_schemes (category);

create table if not exists public.saved_resources (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.users (id) on delete cascade,
  resource_type varchar(32) not null check (
                  resource_type in ('job', 'healthcare', 'education', 'government_scheme', 'organization')
                ),
  resource_id   uuid not null,
  created_at    timestamptz not null default now(),
  unique (user_id, resource_type, resource_id)
);

create index if not exists idx_saved_resources_user_id on public.saved_resources (user_id);

create table if not exists public.analytics (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid references public.users (id) on delete set null,
  event_name          varchar(100) not null,
  event_properties    jsonb default '{}'::jsonb,
  created_at          timestamptz not null default now()
);

create index if not exists idx_analytics_event_name on public.analytics (event_name);
create index if not exists idx_analytics_created_at on public.analytics (created_at desc);