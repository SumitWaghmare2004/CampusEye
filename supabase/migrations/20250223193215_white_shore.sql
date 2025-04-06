/*
  # Add Face Recognition Tables

  1. New Tables
    - `face_descriptors`
      - `id` (uuid, primary key)
      - `student_id` (text, references students.id)
      - `descriptor` (float array)
      - `created_at` (timestamp)
    
    - `behavior_tracking`
      - `id` (uuid, primary key)
      - `student_id` (text, references students.id)
      - `session_start` (timestamp)
      - `session_end` (timestamp)
      - `head_down_count` (integer)
      - `behaviors` (jsonb)
      - `created_at` (timestamp)

  2. Changes
    - Add new columns to students table
      - `contact` (text)
      - `parent_contact` (text)
      - `face_descriptors` (float array array)

  3. Security
    - Enable RLS on new tables
    - Add policies for student and faculty access
*/

-- Add new columns to students table
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS contact text,
ADD COLUMN IF NOT EXISTS parent_contact text,
ADD COLUMN IF NOT EXISTS face_descriptors float[][];

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

-- Enable RLS
ALTER TABLE behavior_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Students can view their own behavior tracking"
  ON behavior_tracking
  FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM students WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Faculty can manage behavior tracking"
  ON behavior_tracking
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM faculty WHERE email = auth.jwt() ->> 'email'
  ));