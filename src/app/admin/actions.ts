'use server';

import { getLeads } from '@/lib/db';
import type { Lead } from '@/lib/db';

function convertToCSV(data: Lead[]): string {
  const headers = [
    'ID', 'Full Name', 'Age', 'Contact Number', 'Email Address', 'City', 
    'Selected Product', 'Priority', 'Urgency Score', 'AI Reasoning', 'Timestamp'
  ];
  const rows = data.map(lead => [
    lead.id,
    `"${lead.fullName.replace(/"/g, '""')}"`,
    lead.age,
    lead.contactNumber,
    lead.emailAddress || '',
    `"${(lead.city || '').replace(/"/g, '""')}"`,
    `"${lead.selectedProduct.replace(/"/g, '""')}"`,
    lead.priority,
    lead.urgencyScore,
    `"${lead.reasoning.replace(/"/g, '""')}"`,
    lead.timestamp.toISOString()
  ].join(','));
  
  return [headers.join(','), ...rows].join('\n');
}

export async function downloadCsv() {
  const leads = await getLeads();
  const csvData = convertToCSV(leads);
  
  const headers = new Headers();
  headers.append('Content-Type', 'text/csv');
  headers.append('Content-Disposition', `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`);
  
  return new Response(csvData, {
    status: 200,
    headers: headers,
  });
}
