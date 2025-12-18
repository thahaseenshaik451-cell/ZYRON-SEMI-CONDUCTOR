'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

function HeroSection() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-slate-900/60" />
      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        <div className="animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight mb-4 drop-shadow-lg">
            Your Reliable Semiconductor Design Partner
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto mb-8 drop-shadow">
            Delivering advanced semiconductor engineering and high-performance chip development. Our quality-driven silicon engineering provides next-generation, global-ready semiconductor solutions.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/services">Our Chip Design Services</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
