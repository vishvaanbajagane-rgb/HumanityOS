-- =====================================================================
-- 0006_rls_policies.sql
-- Row Level Security for every table.
--
-- Auth model: HumanityOS authenticates users via Firebase, not Supabase
-- Auth. The FastAPI backend is the only writer/reader of user-specific
-- data, and it connects with the SUPABASE_SERVICE_ROLE_KEY, which
-- bypasses RLS entirely. RLS here exists as defense-in-depth in case
-- the anon/public key is ever used directly from the frontend:
--
--   * "Reference" tables (organizations, jobs, healthcare, education,
--     emergency, government_schemes, languages) are public directories
--     with no personal data, so anon + authenticated roles get SELECT.
--     Writes are NOT granted to anon/authenticated — only the backend
--     (service_role) can insert/update/delete these.
--
--   * "Private" tables (users, profiles, user_preferences,
--     chat_history, ai_logs, documents, notifications, volunteers,
--     saved_resources, analytics) hold personal data. RLS is enabled
--     with NO policies for anon/authenticated, so those roles get zero
--     access — only service_role (the backend) can touch them.
-- =====================================================================

-- ---------- Reference tables: public read ----------

alter table public.languages enable row level security;
create policy "Public can read languages"
  on public.languages for select
  to anon, authenticated
  using (true);

alter table public.organizations enable row level security;
create policy "Public can read organizations"
  on public.organizations for select
  to anon, authenticated
  using (true);

alter table public.jobs enable row level security;
create policy "Public can read jobs"
  on public.jobs for select
  to anon, authenticated
  using (true);

alter table public.healthcare enable row level security;
create policy "Public can read healthcare"
  on public.healthcare for select
  to anon, authenticated
  using (true);

alter table public.education enable row level security;
create policy "Public can read education"
  on public.education for select
  to anon, authenticated
  using (true);

alter table public.emergency enable row level security;
create policy "Public can read emergency"
  on public.emergency for select
  to anon, authenticated
  using (true);

alter table public.government_schemes enable row level security;
create policy "Public can read government_schemes"
  on public.government_schemes for select
  to anon, authenticated
  using (true);

-- ---------- Private tables: RLS enabled, no anon/authenticated policies ----------

alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.user_preferences enable row level security;
alter table public.chat_history enable row level security;
alter table public.ai_logs enable row level security;
alter table public.documents enable row level security;
alter table public.notifications enable row level security;
alter table public.volunteers enable row level security;
alter table public.saved_resources enable row level security;
alter table public.analytics enable row level security;

-- No CREATE POLICY statements for the tables above: with RLS enabled and
-- zero policies, anon/authenticated roles are denied all access by
-- default, while service_role (used exclusively by the backend) bypasses
-- RLS and retains full access.