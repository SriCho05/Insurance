import { products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { HeroSection } from '@/components/hero-section';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

const testimonials = [
  {
    quote: "The process of getting our health insurance was so simple and clear. We finally have peace of mind knowing our family is protected. Highly recommended!",
    name: "Super Star Health Insurance Customer",
  },
  {
    quote: "I was overwhelmed by all the options. My needs were listened to and the perfect plan was found for me at a great price. A true professional service!",
    name: "Star Health Assure Customer",
  },
  {
    quote: "Finding coverage designed for women's health needs was a breeze. We got better coverage for our family and couldn't be happier with the service.",
    name: "Star Women Care Customer",
  }
];

const features = [
    {
        icon: ShieldCheck,
        title: "Personalized Advice",
        description: "We take the time to understand your unique situation to recommend the best coverage for your needs.",
    },
    {
        icon: Sparkles,
        title: "Simplified Process",
        description: "We cut through the jargon and make understanding and buying insurance straightforward and stress-free.",
    },
    {
        icon: Award,
        title: "Top-Rated Carriers",
        description: "We partner with a wide range of highly-rated insurance companies to find you the best policies and prices.",
    },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
              <AnimateOnScroll>
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Why Work With Us?</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    We are committed to providing you with exceptional service and peace of mind.
                  </p>
                </div>
              </AnimateOnScroll>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                          <AnimateOnScroll key={index} delay={index * 0.15} amount={0.5}>
                              <div className="text-center p-6 rounded-2xl transition-all duration-300 hover:bg-card hover:shadow-2xl hover:-translate-y-2">
                                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                      <Icon className="h-8 w-8" />
                                  </div>
                                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                              </div>
                          </AnimateOnScroll>
                      );
                  })}
              </div>
          </div>
      </section>

      {/* Products Section */}
      <div id="products" className="container mx-auto px-4 py-16 sm:py-20">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Insurance Plans We Offer
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We offer a comprehensive range of health insurance products to protect every aspect of your life.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <AnimateOnScroll key={product.slug} delay={index * 0.15} amount={0.5}>
                <ProductCard product={product} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="bg-card py-16 sm:py-20">
        <div className="container mx-auto px-4">
            <AnimateOnScroll>
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">What Our Clients Say</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                      We're proud to have helped so many people find the right insurance.
                    </p>
                </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <AnimateOnScroll key={index} delay={index * 0.15} amount={0.5}>
                    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        <CardContent className="flex flex-1 flex-col justify-between p-6">
                            <div>
                                <Quote className="h-8 w-8 text-primary/50 mb-4" />
                                <p className="text-muted-foreground">{testimonial.quote}</p>
                            </div>
                            <div className="mt-6">
                                <p className="font-semibold">{testimonial.name}</p>
                            </div>
                        </CardContent>
                    </Card>
                  </AnimateOnScroll>
                ))}
            </div>
        </div>
      </section>
    </>
  );
}
