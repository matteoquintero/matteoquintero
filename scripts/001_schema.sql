-- Full schema for the portfolio, i18n-ready.
-- Idempotent: safe for fresh installs AND for upgrading legacy schemas
-- (handles the rename from text columns to _es/_en).

-- ============================================================
-- experiences
-- ============================================================
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL,
  company TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('creative', 'technical')),
  image TEXT,
  role_es text,
  impact_es text,
  problem_es text,
  decision_es text,
  solution_es text,
  result_es text,
  role_en text,
  impact_en text,
  problem_en text,
  decision_en text,
  solution_en text,
  result_en text,
  technologies text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Legacy rename: role → role_es, impact → impact_es, etc.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'experiences' AND column_name = 'role')     THEN ALTER TABLE experiences RENAME COLUMN role     TO role_es;     END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'experiences' AND column_name = 'impact')   THEN ALTER TABLE experiences RENAME COLUMN impact   TO impact_es;   END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'experiences' AND column_name = 'problem')  THEN ALTER TABLE experiences RENAME COLUMN problem  TO problem_es;  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'experiences' AND column_name = 'decision') THEN ALTER TABLE experiences RENAME COLUMN decision TO decision_es; END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'experiences' AND column_name = 'solution') THEN ALTER TABLE experiences RENAME COLUMN solution TO solution_es; END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'experiences' AND column_name = 'result')   THEN ALTER TABLE experiences RENAME COLUMN result   TO result_es;   END IF;
END $$;

ALTER TABLE experiences ADD COLUMN IF NOT EXISTS role_en     text;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS impact_en   text;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS problem_en  text;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS decision_en text;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS solution_en text;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS result_en   text;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS technologies text[];

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to experiences" ON experiences;
CREATE POLICY "Allow public read access to experiences"
  ON experiences FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_experiences_year ON experiences(year ASC);

-- ============================================================
-- highlights
-- ============================================================
CREATE TABLE IF NOT EXISTS highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL,
  text_es text,
  text_en text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'highlights' AND column_name = 'text')
  THEN ALTER TABLE highlights RENAME COLUMN text TO text_es; END IF;
END $$;

ALTER TABLE highlights ADD COLUMN IF NOT EXISTS text_en text;

ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to highlights" ON highlights;
CREATE POLICY "Allow public read access to highlights"
  ON highlights FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_highlights_year ON highlights(year DESC);

-- ============================================================
-- hero_content  (single-row profile + contacts)
-- ============================================================
CREATE TABLE IF NOT EXISTS hero_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  role_es text, role_en text,
  headline_creative_es text,  headline_creative_en text,
  headline_technical_es text, headline_technical_en text,
  headline_action_es text,    headline_action_en text,
  micro_context_es text,      micro_context_en text,
  scroll_text_es text,        scroll_text_en text,
  profile_image text,
  linkedin_url text,
  whatsapp_number text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Legacy rename: role / headline_* / micro_context / scroll_text → *_es
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_content' AND column_name = 'role')               THEN ALTER TABLE hero_content RENAME COLUMN role               TO role_es;               END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_content' AND column_name = 'headline_creative')  THEN ALTER TABLE hero_content RENAME COLUMN headline_creative  TO headline_creative_es;  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_content' AND column_name = 'headline_technical') THEN ALTER TABLE hero_content RENAME COLUMN headline_technical TO headline_technical_es; END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_content' AND column_name = 'headline_action')    THEN ALTER TABLE hero_content RENAME COLUMN headline_action    TO headline_action_es;    END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_content' AND column_name = 'micro_context')      THEN ALTER TABLE hero_content RENAME COLUMN micro_context      TO micro_context_es;      END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_content' AND column_name = 'scroll_text')        THEN ALTER TABLE hero_content RENAME COLUMN scroll_text        TO scroll_text_es;        END IF;
END $$;

ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS role_en text;
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS headline_creative_en  text;
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS headline_technical_en text;
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS headline_action_en    text;
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS micro_context_en      text;
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS scroll_text_en        text;
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS profile_image text;

ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to hero_content" ON hero_content;
CREATE POLICY "Allow public read access to hero_content"
  ON hero_content FOR SELECT USING (true);

-- ============================================================
-- site_copy  (single-string UI keys, i18n-ready)
-- ============================================================
CREATE TABLE IF NOT EXISTS site_copy (
  key text PRIMARY KEY,
  value_es text NOT NULL,
  value_en text,
  context text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_copy ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to site_copy" ON site_copy;
CREATE POLICY "Allow public read access to site_copy"
  ON site_copy FOR SELECT USING (true);

-- ============================================================
-- site_lists  (ordered string arrays)
-- ============================================================
CREATE TABLE IF NOT EXISTS site_lists (
  list_key text NOT NULL,
  position int NOT NULL,
  value_es text NOT NULL,
  value_en text,
  PRIMARY KEY (list_key, position)
);

ALTER TABLE site_lists ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to site_lists" ON site_lists;
CREATE POLICY "Allow public read access to site_lists"
  ON site_lists FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_site_lists_key_pos ON site_lists(list_key, position);
