-- Remove sort_order column from experiences table
ALTER TABLE experiences 
DROP COLUMN IF EXISTS sort_order;

-- Drop the index if it exists
DROP INDEX IF EXISTS idx_experiences_sort_order;

-- Create new index for year-based sorting
CREATE INDEX IF NOT EXISTS idx_experiences_year ON experiences(year ASC);
