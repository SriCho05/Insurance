import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { LeadForm } from '@/components/lead-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const Icon = product.icon;

  return (
    <div className="bg-background">
      {/* ===== Product Hero Section ===== */}
      <section className="relative overflow-hidden bg-card py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src={product.image.imageUrl}
            alt={product.name}
            fill
            className="object-cover opacity-10 blur-sm"
            data-ai-hint={product.image.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline">
            {product.name}
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            {product.description}
          </p>
        </div>
      </section>

      {/* ===== Main Content ===== */}
      <div id="product-details" className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-3 flex flex-col space-y-12">
            {/* Key Features Section */}
            <div>
              <h3 className="text-3xl font-bold font-headline mb-6">Key Features</h3>
              <ul className="space-y-4">
                {product.details.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4 text-lg">
                    <Check className="w-7 h-7 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coverage Details Section */}
            <div>
                <h3 className="text-3xl font-bold font-headline mb-6">Coverage Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {product.details.coverage.map((item, index) => (
                        <Card key={index} className="bg-secondary/30 flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-xl">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Eligibility Section */}
            <div>
                <h3 className="text-3xl font-bold font-headline mb-6">Eligibility</h3>
                <Card className="bg-secondary/30">
                    <CardContent className="p-6">
                        <p className="text-muted-foreground text-lg">{product.details.eligibility}</p>
                    </CardContent>
                </Card>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div className="lg:col-span-2 flex items-start">
            <div className="sticky top-24 w-full">
              <Card className="w-full shadow-xl transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-8">
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-semibold font-headline">Express Your Interest</h2>
                    <p className="text-muted-foreground mt-2">Fill out the form below to get a quote.</p>
                  </div>
                  <LeadForm productName={product.name} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
