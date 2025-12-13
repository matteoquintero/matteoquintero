-- Create table for hero content
create table if not exists public.hero_content (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  name text not null,
  role text not null,
  headline_creative text not null,
  headline_technical text not null,
  headline_action text not null,
  micro_context text not null,
  scroll_text text not null,
  profile_image text not null,
  linkedin_url text,
  whatsapp_number text,
  email text
);

-- Enable RLS
alter table public.hero_content enable row level security;

-- Allow public read access
create policy "Allow public read access to hero_content"
  on public.hero_content for select
  using (true);

-- Insert default content
insert into public.hero_content (
  name,
  role,
  headline_creative,
  headline_technical,
  headline_action,
  micro_context,
  scroll_text,
  profile_image,
  linkedin_url,
  whatsapp_number,
  email
) values (
  'Mateo Quintero',
  'CTO · Sistemas · Producto',
  'Diseño',
  'sistemas',
  'que resuelven problemas',
  'Portafolio personal',
  'Desliza para ver cómo llegué hasta aquí',
  '/professional-portrait-bw.png',
  'https://linkedin.com/in/matteoquintero',
  '573106441111',
  'mateo@example.com'
);
