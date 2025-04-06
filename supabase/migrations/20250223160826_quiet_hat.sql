/*
  # Initial Schema Setup for CampusEye.AI

  1. New Tables
    - `students`
      - `id` (text, primary key) - Student ID
      - `name` (text) - Student name
      - `email` (text) - Student email
      - `discipline_score` (integer) - Current discipline score
      - `created_at` (timestamp)
    
    - `faculty`
      - `id` (text, primary key) - Faculty ID
      - `name` (text) - Faculty name
      - `email` (text) - Faculty email
      - `department` (text) - Faculty department
      - `created_at` (timestamp)
    
    - `warnings`
      - `id` (uuid, primary key)
      - `student_id` (text, references students)
      - `faculty_id` (text, references faculty)
      - `type` (text) - Warning type (mild, moderate, severe)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `attendance`
      - `id` (uuid, primary key)
      - `student_id` (text, references students)
      - `date` (date)
      - `status` (text) - present, absent, late
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  discipline_score integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

-- Create faculty table
CREATE TABLE IF NOT EXISTS faculty (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  department text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create warnings table
CREATE TABLE IF NOT EXISTS warnings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text REFERENCES students(id) ON DELETE CASCADE,
  faculty_id text REFERENCES faculty(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('mild', 'moderate', 'severe')),
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text REFERENCES students(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE warnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Students can view their own data"
  ON students
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Faculty can view all students"
  ON students
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM faculty WHERE email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Faculty can view their own data"
  ON faculty
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Students can view their own warnings"
  ON warnings
  FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM students WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Faculty can manage warnings"
  ON warnings
  FOR ALL
  TO authenticated
  USING (
    faculty_id IN (
      SELECT id FROM faculty WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Students can view their own attendance"
  ON attendance
  FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM students WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Faculty can manage attendance"
  ON attendance
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM faculty WHERE email = auth.jwt() ->> 'email'
  ));