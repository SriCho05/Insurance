import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Image 
          src={product.image.imageUrl} 
          alt={product.name} 
          width={600} 
          height={400} 
          className="w-full h-48 object-cover" 
          data-ai-hint={product.image.imageHint}
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-xl font-headline">{product.name}</CardTitle>
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/products/${product.slug}`}>
            Apply Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
