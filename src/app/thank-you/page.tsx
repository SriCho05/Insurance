import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThankYouPage() {
  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center text-center px-4 py-20">
      <CheckCircle2 className="w-24 h-24 text-accent mb-6" />
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline mb-4">
        Thank You!
      </h1>
      <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-8">
        Your information has been submitted successfully. We will contact you shortly to discuss your insurance needs.
      </p>
      <Button asChild>
        <Link href="/">
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
