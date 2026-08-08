-- =====================================================================
-- 0007_food_support.sql
-- food_support table — food banks, soup kitchens, meal delivery,
-- grocery assistance programs. Was missing from the original schema;
-- added here to back the "Food Support" quick action.
-- =====================================================================

create table if not exists public.food_support (
  id                uuid primary key default uuid_generate_v4(),
  organization_id   uuid references public.organizations (id) on delete set null,
  name              varchar(255) not null,
  type              varchar(32) not null check (
                      type in ('food-bank', 'soup-kitchen', 'meal-delivery', 'grocery-assistance')
                    ),
  address           text,
  latitude          double precision,
  longitude         double precision,
  phone             varchar(32),
  schedule          varchar(255),
  eligibility       text,
  is_free           boolean not null default true,
  created_at        timestamptz not null default now()
);

create index if not exists idx_food_support_type on public.food_support (type);
create index if not exists idx_food_support_org on public.food_support (organization_id);

alter table public.food_support enable row level security;
create policy "Public can read food_support"
  on public.food_support for select
  to anon, authenticated
  using (true);