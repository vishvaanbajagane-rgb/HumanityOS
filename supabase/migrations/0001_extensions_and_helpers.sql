-- =====================================================================
-- 0001_extensions_and_helpers.sql
-- Extensions and shared helper functions used across all migrations.
-- =====================================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";       -- fuzzy/ILIKE search on names, titles
create extension if not exists "postgis";        -- lat/lng distance queries for "nearby services"

-- Generic updated_at trigger, attached to any table with an updated_at column
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
