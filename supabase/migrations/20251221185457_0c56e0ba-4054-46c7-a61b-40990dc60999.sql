-- Create project_inquiries table for storing form submissions
CREATE TABLE public.project_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_description TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit inquiries"
ON public.project_inquiries
FOR INSERT
WITH CHECK (true);

-- Only admins can view (we'll add admin role check later if needed)
-- For now, no SELECT policy means no one can read via client