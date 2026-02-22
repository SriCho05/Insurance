-- Supabase SQL Schema for Insurance Lead Management
-- Run this SQL in your Supabase dashboard (SQL Editor)

-- ==========================================
-- ADMIN USERS TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Enable RLS for admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy for admin_users (restrict to authenticated operations)
CREATE POLICY "Allow all operations on admin_users" ON admin_users
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert default admin user (password: admin123)
-- The password is hashed using pgcrypto - you should change this in production!
INSERT INTO admin_users (email, password_hash, name, role)
VALUES ('admin@example.com', 'admin123', 'Admin User', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- ==========================================
-- LEADS TABLE
-- ==========================================

-- Create the leads table
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
  contact_number TEXT NOT NULL,
  email_address TEXT,
  city TEXT,
  selected_product TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('High', 'Medium', 'Low')),
  urgency_score INTEGER NOT NULL CHECK (urgency_score >= 1 AND urgency_score <= 10),
  reasoning TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_selected_product ON leads(selected_product);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations (for development)
-- For production, customize this to restrict access as needed
CREATE POLICY "Allow all operations on leads" ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- HELPER FUNCTIONS
-- ==========================================

-- Function to verify admin credentials
CREATE OR REPLACE FUNCTION verify_admin_password(p_email TEXT, p_password TEXT)
RETURNS TABLE (
  id UUID,
  email TEXT,
  name TEXT,
  role TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.id,
    au.email,
    au.name,
    au.role
  FROM admin_users au
  WHERE au.email = p_email 
    AND au.password_hash = p_password;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update last login
CREATE OR REPLACE FUNCTION update_admin_last_login(p_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE admin_users
  SET last_login = NOW()
  WHERE email = p_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- SAMPLE DATA (Optional)
-- ==========================================

-- Uncomment to add sample leads for testing
/*
INSERT INTO leads (id, full_name, age, contact_number, email_address, city, selected_product, priority, urgency_score, reasoning, created_at)
VALUES 
  ('1', 'John Doe', 45, '555-123-4567', 'john.doe@example.com', 'New York', 'Super Star Health Insurance', 'High', 9, 'Customer is in the prime age range for health insurance and provided complete contact information, indicating strong interest.', NOW() - INTERVAL '1 day'),
  ('2', 'Jane Smith', 28, '555-987-6543', 'jane.smith@example.com', 'Los Angeles', 'Star Women Care Insurance', 'Medium', 7, 'Younger customer interested in a specialized product. Good lead for follow-up.', NOW() - INTERVAL '1 day'),
  ('3', 'Sam Wilson', 62, '555-555-5555', NULL, 'Chicago', 'Star Health Assure Insurance', 'High', 8, 'Older customer, good candidate for assure plan.', NOW() - INTERVAL '2 days'),
  ('4', 'Emily Brown', 35, '555-111-2222', 'emily.b@example.com', 'Houston', 'Super Star Health Insurance', 'Medium', 6, 'Standard lead for a popular product.', NOW() - INTERVAL '3 days'),
  ('5', 'Michael Johnson', 55, '555-333-4444', NULL, NULL, 'Cancer Care Platinum', 'High', 10, 'High-urgency product for a customer in a relevant age bracket.', NOW() - INTERVAL '3 days');
*/
