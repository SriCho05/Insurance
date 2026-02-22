'use server';
/**
 * @fileOverview This file defines a Genkit flow for assessing the priority of a new customer lead.
 * It takes customer details as input and provides an AI-generated assessment of urgency and relevance.
 *
 * - assessLeadPriority - A function that handles the lead priority assessment process.
 * - AssessLeadPriorityInput - The input type for the assessLeadPriority function.
 * - AssessLeadPriorityOutput - The return type for the assessLeadPriority function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AssessLeadPriorityInputSchema = z.object({
  fullName: z.string().describe('The full name of the customer lead.'),
  age: z.number().int().min(18).describe('The age of the customer lead.'),
  contactNumber: z.string().describe('The contact phone number of the customer lead.'),
  emailAddress: z.string().email().optional().describe('The email address of the customer lead (optional).'),
  city: z.string().optional().describe('The city of the customer lead (optional).'),
  selectedProduct: z.string().describe('The insurance product the customer is interested in.'),
});
export type AssessLeadPriorityInput = z.infer<typeof AssessLeadPriorityInputSchema>;

const AssessLeadPriorityOutputSchema = z.object({
  priority: z.enum(['High', 'Medium', 'Low']).describe('The assessed priority of the lead. High indicates immediate attention, Low indicates less urgency.'),
  urgencyScore: z.number().int().min(1).max(10).describe('An integer score from 1 (lowest urgency) to 10 (highest urgency) based on the lead details and selected product.'),
  reasoning: z.string().describe('A detailed explanation for the priority assessment and urgency score.'),
});
export type AssessLeadPriorityOutput = z.infer<typeof AssessLeadPriorityOutputSchema>;

export async function assessLeadPriority(input: AssessLeadPriorityInput): Promise<AssessLeadPriorityOutput> {
  return assessLeadPriorityFlow(input);
}

const assessLeadPriorityPrompt = ai.definePrompt({
  name: 'assessLeadPriorityPrompt',
  input: { schema: AssessLeadPriorityInputSchema },
  output: { schema: AssessLeadPriorityOutputSchema },
  prompt: `You are an expert insurance agent. Your task is to assess the urgency and relevance of a new customer lead for an insurance product. Consider the provided details to determine if this lead requires immediate attention or is less urgent. Provide a priority level (High, Medium, or Low), an urgency score from 1 to 10 (where 1 is lowest and 10 is highest urgency), and a detailed reasoning for your assessment.

Here are the customer lead details:
Full Name: {{{fullName}}}
Age: {{{age}}}
Contact Number: {{{contactNumber}}}
{{#if emailAddress}}Email Address: {{{emailAddress}}}{{/if}}
{{#if city}}City: {{{city}}}{{/if}}
Selected Product: {{{selectedProduct}}}

Consider factors such as:
- The age of the customer in relation to the product (e.g., life insurance might be more urgent for older clients).
- Completeness of contact information (more ways to contact might suggest higher interest or easier follow-up).
- The nature of the selected product (some products naturally imply higher urgency).

Your output MUST be a JSON object matching the AssessLeadPriorityOutputSchema. DO NOT include any other text besides the JSON.`,
});

const assessLeadPriorityFlow = ai.defineFlow(
  {
    name: 'assessLeadPriorityFlow',
    inputSchema: AssessLeadPriorityInputSchema,
    outputSchema: AssessLeadPriorityOutputSchema,
  },
  async (input) => {
    const { output } = await assessLeadPriorityPrompt(input);
    return output!;
  }
);
