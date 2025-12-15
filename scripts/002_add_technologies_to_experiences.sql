-- Add technologies column to experiences table
ALTER TABLE experiences
ADD COLUMN IF NOT EXISTS technologies text[];

-- Add a comment explaining the column
COMMENT ON COLUMN experiences.technologies IS 'Array of technology names/tags used in this experience';
