-- Medical Flashcards Feedback Table (5 Essential Questions)
CREATE TABLE IF NOT EXISTS flashcard_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- User Info
  user_name TEXT NOT NULL,
  phone_number TEXT NOT NULL CHECK (phone_number ~ '^[6-9][0-9]{9}$'),
  mbbs_year TEXT NOT NULL,
  
  -- Session Data
  session_duration INTEGER,
  cards_completed INTEGER,
  responses JSONB,
  
  -- 5 Core Questions
  why_use_flashcards TEXT[], -- Array for multi-select
  biggest_barrier TEXT,
  most_important_feature TEXT,
  want_mcqs_after TEXT,
  session_feeling TEXT,
  
  -- Additional Feedback
  additional_comments TEXT,
  
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE flashcard_feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert
CREATE POLICY "Anyone can insert feedback" 
  ON flashcard_feedback 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Policy: Anyone can view (for admin dashboard)
CREATE POLICY "Anyone can view feedback" 
  ON flashcard_feedback 
  FOR SELECT 
  TO anon 
  USING (true);
