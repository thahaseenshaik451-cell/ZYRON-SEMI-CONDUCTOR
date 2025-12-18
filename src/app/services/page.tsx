'use client';

import {
  type LucideIcon,
  HelpCircle,
  Search,
  ClipboardList,
  ShieldCheck,
  Cpu
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
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    return Icon || HelpCircle;
};

function ServicesSection() {
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading } = useCollection<Omit<Service, 'id'>>(servicesCollection);
  
  return (
    <section id="services" className="py-16 md:py-24 pt-32 md:pt-40">
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
             <Card key={index} className="flex flex-col text-center items-center p-8 bg-card">
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
                className="flex flex-col text-center items-center p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card"
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

function ProcessSection() {
    const processSteps = [
        {
            step: "01",
            title: "Discovery & Planning",
            description: "We work with you to understand your requirements, challenges, and goals, creating a detailed project roadmap.",
            icon: Search,
        },
        {
            step: "02",
            title: "Architecture & Design",
            description: "Our experts design a robust and scalable chip architecture tailored to your specific needs.",
            icon: ClipboardList,
        },
        {
            step: "03",
            title: "Verification & Validation",
            description: "Rigorous testing at every stage ensures a flawless final product that meets all specifications.",
            icon: ShieldCheck,
        },
        {
            step: "04",
            title: "Silicon Delivery",
            description: "We manage the entire process through to tape-out and delivery of high-quality silicon.",
            icon: Cpu,
        },
    ];

    return (
        <section id="process" className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">Our Proven Process</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        A streamlined workflow for efficient, transparent, and successful project delivery.
                    </p>
                </div>
                <div className="relative">
                    <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-border -translate-x-1/2"></div>
                    <div className="space-y-12 md:space-y-0">
                        {processSteps.map((item, index) => {
                             const isEven = index % 2 === 0;
                             const Icon = item.icon;
                             return (
                                <div key={item.step} className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                                    <div className="md:w-5/12">
                                        <div className="bg-background p-6 rounded-lg shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-primary/10 p-3 rounded-full">
                                                    <Icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <h3 className="font-headline text-2xl font-bold">{item.title}</h3>
                                            </div>
                                            <p className="mt-3 text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="relative flex-shrink-0">
                                         <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl shadow-lg">
                                            {item.step}
                                        </div>
                                    </div>
                                    <div className="md:w-5/12 hidden md:block"></div>
                                </div>
                             )
                        })}
                    </div>
                </div>
                 <div className="text-center mt-16">
                    <Button asChild size="lg">
                        <Link href="/contact">Start Your Project</Link>
                    </Button>
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
                <ProcessSection />
            </main>
            <Footer />
        </div>
    );
}
