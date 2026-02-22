'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const hero = {
  title: "Your Trusted Insurance Advisor",
  subtitle: "We are dedicated to helping you navigate the complexities of insurance. Let's work together to protect what matters most to you."
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
       {/* The animated gradient is now directly on this div and will be visible */}
       <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 bg-[length:200%_200%] animate-animated-gradient blur-xl" />
       
       {/* A semi-transparent overlay to ensure text is readable over the animation */}
       <div className="absolute inset-0 -z-20 bg-background" />

      <div className="container relative mx-auto grid grid-cols-1 items-center gap-12 px-4 py-24 text-center lg:py-32">
        <motion.div 
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.2 
              } 
            }
          }}
        >
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {hero.title}
          </motion.h1>
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div 
            className="flex justify-center gap-4"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="#products">Explore Services</a>
            </Button>
            <Button size="lg" variant="outline">
              Get a Free Quote
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
