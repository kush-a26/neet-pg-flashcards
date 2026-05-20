-- Update existing flashcard_feedback table for new 5-question structure
-- Run this in Supabase SQL Editor

-- Add new columns (if they don't exist)
ALTER TABLE flashcard_feedback 
ADD COLUMN IF NOT EXISTS why_use_flashcards TEXT[],
ADD COLUMN IF NOT EXISTS biggest_barrier TEXT,
ADD COLUMN IF NOT EXISTS most_important_feature TEXT,
ADD COLUMN IF NOT EXISTS session_feeling TEXT;

-- Note: want_mcqs_after and additional_comments already exist

-- Success message
SELECT 'Table updated for 5-question feedback form!' as result;
