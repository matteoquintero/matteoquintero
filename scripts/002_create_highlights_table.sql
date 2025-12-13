-- Create highlights table for education, certifications, and other milestones
CREATE TABLE IF NOT EXISTS highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for sorting by year
CREATE INDEX IF NOT EXISTS idx_highlights_year ON highlights(year DESC);

-- Enable RLS (but allow public read access since this is a portfolio)
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read highlights (public portfolio)
CREATE POLICY "Allow public read access to highlights"
  ON highlights
  FOR SELECT
  USING (true);

-- Insert seed data
INSERT INTO highlights (year, text)
VALUES
  ('2010', 'SENA — Tecnólogo en Análisis y Desarrollo de Sistemas'),
  ('2023', 'Stride — Inglés Profesional B2+')
ON CONFLICT DO NOTHING;
