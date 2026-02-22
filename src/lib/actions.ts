'use server';

import { redirect } from 'next/navigation';
import { addLead } from '@/lib/db';
import { assessLeadPriority } from '@/ai/flows/assess-lead-priority-flow';
import { leadFormSchema } from '@/lib/schema';

export type LeadFormState = {
  message: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
  success: boolean;
} | null;

export async function submitLead(prevState: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const rawData = Object.fromEntries(formData.entries());
  
  const validatedFields = leadFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false
    };
  }

  const leadData = validatedFields.data;
  
  try {
    const assessment = await assessLeadPriority(leadData);
    
    const newLead = {
      id: Date.now().toString(),
      ...leadData,
      ...assessment,
      timestamp: new Date(),
    };
    await addLead(newLead);
  } catch (error) {
    console.error("AI assessment or DB operation failed:", error);
    // Even if AI fails, save the lead with default priority
    const newLead = {
      id: Date.now().toString(),
      ...leadData,
      priority: 'Medium' as const,
      urgencyScore: 5,
      reasoning: 'AI assessment failed. Default priority assigned.',
      timestamp: new Date(),
    };
    await addLead(newLead);
  }
  
  redirect('/thank-you');
}
