'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { verifyAdminCredentials } from '@/lib/db';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type LoginState = {
  error?: string;
} | undefined;

export async function login(prevState: LoginState, formData: FormData) {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: 'Invalid email or password format.',
    };
  }
  
  const { email, password } = validatedFields.data;

  // Verify credentials against database
  const admin = await verifyAdminCredentials(email, password);
  
  if (admin) {
    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify({ 
      userId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role 
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });
    redirect('/admin');
  }

  return {
    error: 'Invalid credentials. Please try again.',
  };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  
  try {
    const parsed = JSON.parse(session);
    return { user: parsed };
  } catch {
    return null;
  }
}
