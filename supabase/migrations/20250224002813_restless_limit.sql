/*
  # Update student schema and add behavior tracking

  1. Changes
    - Add new columns to students table:
      - contact (text)
      - parent_contact (text)
      - parent_email (text)
      - class (text)
      - section (text)
      - discipline_score (integer)

  2. New Tables
    - behavior_tracking
      - id (uuid, primary key)
      - student_id (text, foreign key)
      - session_start (timestamptz)
      - session_end (timestamptz)
      - head_down_count (integer)
      - behaviors (jsonb)
      - created_at (timestamptz)

  3. Security
    - Enable RLS on behavior_tracking
    - Add policies for behavior tracking access
*/

-- Add new columns to students table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'contact') THEN
    ALTER TABLE students ADD COLUMN contact text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'parent_contact') THEN
    ALTER TABLE students ADD COLUMN parent_contact text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'parent_email') THEN
    ALTER TABLE students ADD COLUMN parent_email text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'class') THEN
    ALTER TABLE students ADD COLUMN class text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'section') THEN
    ALTER TABLE students ADD COLUMN section text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'discipline_score') THEN
    ALTER TABLE students ADD COLUMN discipline_score integer DEFAULT 100;
  END IF;
END $$;

-- Create behavior_tracking table
CREATE TABLE IF NOT EXISTS behavior_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text REFERENCES students(id) ON DELETE CASCADE,
  session_start timestamptz NOT NULL,
  session_end timestamptz NOT NULL,
  head_down_count integer DEFAULT 0,
  behaviors jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on new table
ALTER TABLE behavior_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for behavior tracking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'behavior_tracking' 
    AND policyname = 'Students can view their own behavior tracking'
  ) THEN
    CREATE POLICY "Students can view their own behavior tracking"
      ON behavior_tracking
      FOR SELECT
      TO authenticated
      USING (
        student_id IN (
          SELECT id FROM students WHERE email = auth.jwt() ->> 'email'
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'behavior_tracking' 
    AND policyname = 'Faculty can manage behavior tracking'
  ) THEN
    CREATE POLICY "Faculty can manage behavior tracking"
      ON behavior_tracking
      FOR ALL
      TO authenticated
      USING (EXISTS (
        SELECT 1 FROM faculty WHERE email = auth.jwt() ->> 'email'
      ));
  END IF;
END $$;