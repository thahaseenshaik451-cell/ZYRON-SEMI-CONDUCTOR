'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

const iconMap: { [key: string]: LucideIcon } = {
  ...LucideIcons
};

const getIcon = (iconName: string): LucideIcon => {
    const Icon = iconMap[iconName];
    return Icon || LucideIcons.HelpCircle;
};


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

function ServicesPreview() {
    const firestore = useFirestore();
    const servicesCollection = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
    const { data: services, isLoading } = useCollection<Omit<Service, 'id'>>(servicesCollection);
    
    return (
      <section id="services-preview" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
              End-to-End Semiconductor Design Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From concept to silicon, we provide custom chip development and scalable IC design.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && Array.from({ length: 3 }).map((_, index) => (
               <Card key={index} className="flex flex-col text-center items-center p-8">
                  <div className="mb-4 bg-primary/10 p-4 rounded-full">
                      <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse" />
                  </div>
                  <CardHeader className="p-0">
                      <div className="h-6 w-36 bg-gray-300 rounded animate-pulse" />
                  </CardHeader>
                  <CardContent className="p-0 mt-2 flex-grow">
                      <div className="h-4 w-full bg-gray-300 rounded animate-pulse mt-2" />
                      <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse mt-2" />
                  </CardContent>
               </Card>
          ))}
            {services?.slice(0, 3).map((service) => {
              const Icon = getIcon(service.icon);
              return (
                  <Card
                  key={service.id}
                  className="flex flex-col text-center items-center p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  >
                  <div className="mb-4 bg-primary/10 p-4 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardHeader className="p-0">
                      <CardTitle className="font-headline text-xl">
                      {service.name}
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-2 flex-grow">
                      <p className="text-muted-foreground line-clamp-3">{service.description}</p>
                  </CardContent>
                  </Card>
              )
          })}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/services">Explore All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  function WhyChooseUs() {
    const features = [
        {
            title: 'Precision Design',
            description: 'Leveraging cutting-edge tools for unparalleled accuracy in every project.',
            icon: LucideIcons.Crosshair
        },
        {
            title: 'Low-Power Solutions',
            description: 'Specializing in energy-efficient designs for next-gen devices.',
            icon: LucideIcons.BatteryCharging
        },
        {
            title: 'Scalable Platforms',
            description: 'Building flexible and future-proof architectures for diverse applications.',
            icon: LucideIcons.Scaling
        },
    ];

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
                        Why Partner with Zyron?
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Our commitment to innovation, quality, and client success sets us apart.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6">
                            <div className="flex justify-center mb-4">
                                <div className="bg-primary/10 p-4 rounded-full">
                                    <feature.icon className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild size="lg" variant="outline">
                        <Link href="/features">Learn More About Our Features</Link>
                    </Button>
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
        <ServicesPreview />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
}
