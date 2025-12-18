'use client';

import {
  Cpu,
  Binary,
  ShieldCheck,
  Layers3,
  Cog,
  Check,
  type LucideIcon,
  HelpCircle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import * as LucideIcons from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
};


const iconMap: { [key: string]: LucideIcon } = {
  Cpu,
  Binary,
  ShieldCheck,
  Layers3,
  Cog,
  Check,
  ...LucideIcons
};

const getIcon = (iconName: string): LucideIcon => {
    const Icon = iconMap[iconName];
    return Icon || HelpCircle;
};

function ServicesSection() {
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading } = useCollection<Omit<Service, 'id'>>(servicesCollection);
  
  return (
    <section id="services" className="py-16 md:py-24 pt-32 md:pt-40 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
            End-to-End Semiconductor Design Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From concept to silicon, we provide cost-efficient custom chip development and scalable IC design for modern applications. Our services are tailored for startups and enterprises alike.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading && Array.from({ length: 6 }).map((_, index) => (
             <Card key={index} className="flex flex-col text-center items-center p-8 bg-background/50 md:bg-card">
                <div className="mb-4 bg-primary/10 p-4 rounded-full">
                    <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse" />
                </div>
                <CardHeader className="p-0">
                    <div className="h-6 w-48 bg-gray-300 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="p-0 mt-2 flex-grow">
                    <div className="h-4 w-full bg-gray-300 rounded animate-pulse mt-2" />
                    <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse mt-2" />
                </CardContent>
             </Card>
        ))}
          {services?.map((service) => {
            const Icon = getIcon(service.icon);
            return (
                <Card
                key={service.id}
                className="flex flex-col text-center items-center p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-background/50 md:bg-card"
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
                    <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
                </Card>
            )
        })}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <Header />
            <main className="flex-1">
                <ServicesSection />
            </main>
            <Footer />
        </div>
    );
}
