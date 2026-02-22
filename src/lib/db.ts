import { supabase } from './supabase';

export type Lead = {
  id: string;
  fullName: string;
  age: number;
  contactNumber: string;
  emailAddress?: string;
  city?: string;
  selectedProduct: string;
  priority: 'High' | 'Medium' | 'Low';
  urgencyScore: number;
  reasoning: string;
  timestamp: Date;
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  createdAt: Date;
  lastLogin?: Date;
};

// Database row type (snake_case as stored in Supabase)
type LeadRow = {
  id: string;
  full_name: string;
  age: number;
  contact_number: string;
  email_address: string | null;
  city: string | null;
  selected_product: string;
  priority: 'High' | 'Medium' | 'Low';
  urgency_score: number;
  reasoning: string;
  created_at: string;
};

type AdminUserRow = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  created_at: string;
  last_login: string | null;
};

// Convert database row to Lead type
function rowToLead(row: LeadRow): Lead {
  return {
    id: row.id,
    fullName: row.full_name,
    age: row.age,
    contactNumber: row.contact_number,
    emailAddress: row.email_address || undefined,
    city: row.city || undefined,
    selectedProduct: row.selected_product,
    priority: row.priority,
    urgencyScore: row.urgency_score,
    reasoning: row.reasoning,
    timestamp: new Date(row.created_at),
  };
}

// Convert Lead type to database row format
function leadToRow(lead: Lead): Omit<LeadRow, 'created_at'> & { created_at?: string } {
  return {
    id: lead.id,
    full_name: lead.fullName,
    age: lead.age,
    contact_number: lead.contactNumber,
    email_address: lead.emailAddress || null,
    city: lead.city || null,
    selected_product: lead.selectedProduct,
    priority: lead.priority,
    urgency_score: lead.urgencyScore,
    reasoning: lead.reasoning,
    created_at: lead.timestamp.toISOString(),
  };
}

export const getLeads = async (): Promise<Lead[]> => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error);
    throw new Error('Failed to fetch leads');
  }

  return (data as LeadRow[]).map(rowToLead);
};

export const addLead = async (lead: Lead): Promise<void> => {
  const row = leadToRow(lead);
  
  const { error } = await supabase
    .from('leads')
    .insert(row);

  if (error) {
    console.error('Error adding lead:', error);
    throw new Error('Failed to add lead');
  }
};

export const getLeadById = async (id: string): Promise<Lead | null> => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    console.error('Error fetching lead:', error);
    throw new Error('Failed to fetch lead');
  }

  return rowToLead(data as LeadRow);
};

export const deleteLead = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting lead:', error);
    throw new Error('Failed to delete lead');
  }
};

export const updateLead = async (id: string, updates: Partial<Lead>): Promise<void> => {
  const rowUpdates: Record<string, unknown> = {};
  
  if (updates.fullName !== undefined) rowUpdates.full_name = updates.fullName;
  if (updates.age !== undefined) rowUpdates.age = updates.age;
  if (updates.contactNumber !== undefined) rowUpdates.contact_number = updates.contactNumber;
  if (updates.emailAddress !== undefined) rowUpdates.email_address = updates.emailAddress || null;
  if (updates.city !== undefined) rowUpdates.city = updates.city || null;
  if (updates.selectedProduct !== undefined) rowUpdates.selected_product = updates.selectedProduct;
  if (updates.priority !== undefined) rowUpdates.priority = updates.priority;
  if (updates.urgencyScore !== undefined) rowUpdates.urgency_score = updates.urgencyScore;
  if (updates.reasoning !== undefined) rowUpdates.reasoning = updates.reasoning;

  const { error } = await supabase
    .from('leads')
    .update(rowUpdates)
    .eq('id', id);

  if (error) {
    console.error('Error updating lead:', error);
    throw new Error('Failed to update lead');
  }
};

export const clearLeads = async (): Promise<void> => {
  const { error } = await supabase
    .from('leads')
    .delete()
    .neq('id', ''); // Delete all rows

  if (error) {
    console.error('Error clearing leads:', error);
    throw new Error('Failed to clear leads');
  }
};

// Stats functions for admin dashboard
export const getLeadStats = async () => {
  const leads = await getLeads();
  
  const totalLeads = leads.length;
  const highPriority = leads.filter(l => l.priority === 'High').length;
  const mediumPriority = leads.filter(l => l.priority === 'Medium').length;
  const lowPriority = leads.filter(l => l.priority === 'Low').length;
  
  // Calculate average urgency score
  const avgUrgencyScore = totalLeads > 0 
    ? leads.reduce((sum, l) => sum + l.urgencyScore, 0) / totalLeads 
    : 0;

  // Get leads by product
  const leadsByProduct = leads.reduce((acc, lead) => {
    acc[lead.selectedProduct] = (acc[lead.selectedProduct] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get leads over time (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const leadsOverTime = leads
    .filter(l => l.timestamp >= thirtyDaysAgo)
    .reduce((acc, lead) => {
      const dateKey = lead.timestamp.toISOString().split('T')[0];
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return {
    totalLeads,
    highPriority,
    mediumPriority,
    lowPriority,
    avgUrgencyScore: Math.round(avgUrgencyScore * 10) / 10,
    leadsByProduct,
    leadsOverTime,
  };
};

// ==========================================
// ADMIN USER FUNCTIONS
// ==========================================

function rowToAdminUser(row: AdminUserRow): AdminUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    createdAt: new Date(row.created_at),
    lastLogin: row.last_login ? new Date(row.last_login) : undefined,
  };
}

export const verifyAdminCredentials = async (
  email: string,
  password: string
): Promise<AdminUser | null> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('password_hash', password)
    .single();

  if (error || !data) {
    return null;
  }

  // Update last login time
  await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', data.id);

  return rowToAdminUser(data as AdminUserRow);
};

export const getAdminByEmail = async (email: string): Promise<AdminUser | null> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) {
    return null;
  }

  return rowToAdminUser(data as AdminUserRow);
};

export const getAllAdmins = async (): Promise<AdminUser[]> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching admins:', error);
    throw new Error('Failed to fetch admins');
  }

  return (data as AdminUserRow[]).map(rowToAdminUser);
};

export const createAdminUser = async (
  email: string,
  password: string,
  name: string,
  role: 'admin' | 'super_admin' = 'admin'
): Promise<AdminUser> => {
  const { data, error } = await supabase
    .from('admin_users')
    .insert({
      email,
      password_hash: password, // In production, hash this properly!
      name,
      role,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating admin:', error);
    throw new Error('Failed to create admin user');
  }

  return rowToAdminUser(data as AdminUserRow);
};

export const deleteAdminUser = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('admin_users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting admin:', error);
    throw new Error('Failed to delete admin user');
  }
};

export const updateAdminPassword = async (
  id: string,
  newPassword: string
): Promise<void> => {
  const { error } = await supabase
    .from('admin_users')
    .update({ password_hash: newPassword })
    .eq('id', id);

  if (error) {
    console.error('Error updating password:', error);
    throw new Error('Failed to update password');
  }
};
