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
import { Check, Zap, Gauge, Scaling, BrainCircuit, Search, ClipboardList, ShieldCheck, Cpu, Mail, Phone, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { addDocumentNonBlocking } from '@/firebase';
import { serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  imageUrl: string;
  imageHint: string;
};

const iconMap: { [key: string]: LucideIcon } = {
  ...LucideIcons
};

const getIcon = (iconName: string): LucideIcon => {
    const Icon = iconMap[iconName];
    return Icon || LucideIcons.HelpCircle;
};

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z.string().min(2, { message: 'Subject must be at least 2 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

function HeroSection() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');
  return (
    <section id="home" className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center text-center text-white">
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight mb-4 drop-shadow-lg text-white">
            Your Reliable Semiconductor Design Partner
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto mb-8 drop-shadow">
            Delivering advanced semiconductor engineering and high-performance chip development. Our quality-driven silicon engineering provides next-generation, global-ready semiconductor solutions.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#services">Our Chip Design Services</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading } = useCollection<Omit<Service, 'id'>>(servicesCollection);
  
  return (
    <section id="services" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground">
            End-to-End Semiconductor Design Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From concept to silicon, we provide cost-efficient custom chip development and scalable IC design for modern applications. Our services are tailored for startups and enterprises alike.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading && Array.from({ length: 6 }).map((_, index) => (
             <Card key={index} className="flex flex-col text-center items-center bg-background overflow-hidden">
                <div className="h-48 w-full bg-gray-300 animate-pulse" />
                <div className="p-6 w-full">
                  <div className="h-6 w-48 bg-gray-300 rounded animate-pulse mx-auto" />
                  <div className="h-4 w-full bg-gray-300 rounded animate-pulse mt-4" />
                  <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse mt-2 mx-auto" />
                </div>
             </Card>
        ))}
          {services?.map((service) => {
            return (
                <Card
                key={service.id}
                className="flex flex-col text-center items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-background overflow-hidden"
                >
                <div className="relative h-48 w-full">
                  <Image 
                    src={service.imageUrl} 
                    alt={service.name} 
                    fill 
                    className="object-cover"
                    data-ai-hint={service.imageHint}
                  />
                </div>
                <CardHeader className="p-6 pb-2 w-full">
                    <CardTitle className="font-headline text-xl">
                    {service.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex-grow w-full">
                    <p className="text-muted-foreground text-sm">{service.description}</p>
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
        <section id="process" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground">Our Proven Process</h2>
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
                                        <div className="bg-card p-6 rounded-lg shadow-sm">
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
                        <Link href="#contact">Start Your Project</Link>
                    </Button>
                 </div>
            </div>
        </section>
    );
}

function FeaturesSection() {
    const features = [
        {
            title: 'Precision Semiconductor Design',
            description: 'Leveraging cutting-edge tools for unparalleled accuracy in chip design.',
            icon: Check
        },
        {
            title: 'Low-Power Solutions',
            description: 'Specializing in energy-efficient designs for next-gen devices.',
            icon: Check
        },
        {
            title: 'Scalable Silicon Platforms',
            description: 'Building flexible and future-proof architectures for a variety of applications.',
            icon: Check
        },
        {
            title: 'Innovation-Driven Engineering',
            description: 'Our culture of innovation ensures we are always at the forefront of technology.',
            icon: Check
        },
        {
            title: 'Professional Chip Architecture',
            description: 'Expert-level design of chip architecture to meet your specific needs.',
            icon: Check
        },
        {
            title: 'Future-Ready Technology',
            description: 'Designing semiconductors that are ready for tomorrow\'s challenges.',
            icon: Check
        }
    ];

    return (
        <section id="features" className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground">
                        Our Features
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Explore the innovative features that set Zyron Semi Conductors apart.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return(
                        <Card key={index} className="flex flex-col p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-background">
                             <div className="mb-4 bg-primary/10 p-3 rounded-full w-min">
                                <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardHeader className='p-0'>
                                <CardTitle className="font-headline text-xl">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='p-0 mt-2 flex-grow'>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    )})}
                </div>
            </div>
        </section>
    );
}

function TechSpotlightSection() {
    const techItems = [
      { name: 'High-Speed Interfaces', icon: Zap, description: 'Expertise in PCIe, DDR, and Ethernet for rapid data transfer.' },
      { name: 'Advanced Process Nodes', icon: Gauge, description: 'Proven experience in 7nm, 5nm, and below for maximum performance.' },
      { name: 'Scalable SoC Architectures', icon: Scaling, description: 'Designing flexible SoCs that grow with your product roadmap.' },
      { name: 'AI/ML Acceleration', icon: BrainCircuit, description: 'Custom hardware accelerators for efficient AI inference and training.' },
    ];
  
    return (
      <section id="tech-spotlight" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground">
              Technology Spotlight
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We harness industry-leading technologies to deliver superior silicon solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {techItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center p-6 rounded-lg hover:bg-card">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-headline font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

function ContactSection() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: FormData) => {
    if (!firestore) return;
    const submissionsCollection = collection(firestore, 'contact_form_submissions');
    addDocumentNonBlocking(submissionsCollection, {
      ...data,
      submissionDate: serverTimestamp(),
    });
    toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you shortly.',
    });
    form.reset();
  };


    return (
      <section id="contact" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground">
              Contact Our Indian Chip Design Services Provider
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              As a global semiconductor engineering firm, we&apos;d love to hear from you. Have a project in mind or want to learn more about our Zyron IC engineering?
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full mt-1">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-muted-foreground">
                    Reach out for project inquiries.
                  </p>
                  <a
                    href="mailto:contact@zyron.com"
                    className="text-primary font-medium hover:underline"
                  >
                    contact@zyron.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full mt-1">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-muted-foreground">
                    Discuss your needs with an expert.
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-primary font-medium hover:underline"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full mt-1">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Office</h3>
                  <p className="text-muted-foreground">
                    123 Innovation Drive, Bangalore, India
                  </p>
                </div>
              </div>
            </div>
            <Card className='bg-background'>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Project Inquiry" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                  placeholder="Tell us about your project..."
                                  rows={5}
                                  {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
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
        <ServicesSection />
        <ProcessSection />
        <FeaturesSection />
        <TechSpotlightSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
