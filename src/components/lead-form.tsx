'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { submitLead } from '@/lib/actions';
import type { LeadFormState } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit Information
    </Button>
  );
}

export function LeadForm({ productName }: { productName: string }) {
  const initialState: LeadFormState = { message: '', success: false };
  const [state, formAction] = useActionState(submitLead, initialState);
  const { toast } = useToast();
  
  useEffect(() => {
    if (state?.success === false && state.message) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="selectedProduct" value={productName} />
      
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" placeholder="Rahul Sharma" required />
        {state?.errors?.fullName && <p className="text-sm font-medium text-destructive">{state.errors.fullName.join(', ')}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" placeholder="35" required min="18" />
          {state?.errors?.age && <p className="text-sm font-medium text-destructive">{state.errors.age.join(', ')}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input id="contactNumber" name="contactNumber" placeholder="+91 98765 43210" required />
          {state?.errors?.contactNumber && <p className="text-sm font-medium text-destructive">{state.errors.contactNumber.join(', ')}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="emailAddress">Email Address (Optional)</Label>
        <Input id="emailAddress" name="emailAddress" type="email" placeholder="rahul.sharma@example.com" />
        {state?.errors?.emailAddress && <p className="text-sm font-medium text-destructive">{state.errors.emailAddress.join(', ')}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City (Optional)</Label>
        <Input id="city" name="city" placeholder="Mumbai" />
        {state?.errors?.city && <p className="text-sm font-medium text-destructive">{state.errors.city.join(', ')}</p>}
      </div>
      
      <SubmitButton />
    </form>
  );
}
