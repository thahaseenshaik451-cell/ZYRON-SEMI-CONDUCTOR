import Image from 'next/image';
import Link from 'next/link';
import {
  Cpu,
  Binary,
  ShieldCheck,
  Layers3,
  Cog,
  Mail,
  Phone,
  MapPin,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
            Zyron: Your Reliable Semiconductor Design Partner
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto mb-8 drop-shadow">
            As a leading semiconductor design company, Zyron offers advanced semiconductor solutions and custom chip design services. We are a professional chip design firm focused on quality-driven IC design and development.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#services">Our Services</Link>
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

const services = [
  {
    icon: Cpu,
    title: 'Custom Chip Architecture Design',
    description:
      'Designing bespoke chip architectures from the ground up to meet your unique performance, power, and cost requirements.',
  },
  {
    icon: Binary,
    title: 'RTL & Logic Design Services',
    description:
      'Expert RTL coding and logic design to translate your architectural specifications into efficient, high-performance hardware.',
  },
  {
    icon: ShieldCheck,
    title: 'Semiconductor Verification Solutions',
    description:
      'Rigorous verification and validation processes to ensure your design is robust, reliable, and provides silicon-ready design services.',
  },
  {
    icon: Layers3,
    title: 'Micro-Architecture Development Services',
    description:
      'Detailed micro-architecture development to optimize data paths, control logic, and memory subsystems for peak efficiency.',
  },
  {
    icon: Cog,
    title: 'Physical Design & Optimization',
    description:
      'Advanced physical design techniques, from floorplanning to tape-out, to optimize for area, timing, and power consumption.',
  },
  {
    icon: Cpu,
    title: "End-to-End Semiconductor Design",
    description: "Seamlessly integrating multiple components into a single, powerful SoC to reduce form factor and improve performance."
  }
];

function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
            High-Quality Semiconductor Engineering Support
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From concept to silicon, we provide end-to-end IC design and verification services. Our scalable and reliable chip design solutions are cost-effective for startups and enterprises.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="flex flex-col text-center items-center p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-background/50 md:bg-card"
            >
              <div className="mb-4 bg-primary/10 p-4 rounded-full">
                <service.icon className="h-8 w-8 text-primary" />
              </div>
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-xl">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2 flex-grow">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const capabilities = [
    'Next-Gen SoC Design',
    'AI/ML Hardware Acceleration',
    'Low-Power IoT Solutions',
    'High-Performance Computing',
    'Advanced Verification Methodologies',
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
              A Quality-Focused Semiconductor Company
            </h2>
            <div className="mt-6 space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-headline text-xl font-semibold text-foreground mb-2">
                  Our Mission
                </h3>
                <p>
                  To empower our clients with state-of-the-art semiconductor
                  solutions that push the boundaries of technology, driving
                  progress and creating a smarter, more connected world through precision-driven chip engineering.
                </p>
              </div>
              <div>
                <h3 className="font-headline text-xl font-semibold text-foreground mb-2">
                  Our Vision
                </h3>
                <p>
                  To be the world&apos;s most trusted, customer-centric semiconductor services partner, recognized for our unwavering commitment to innovation, quality, and global standard chip development.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-sm animate-in fade-in slide-in-from-right-8 duration-1000">
            <h3 className="font-headline text-2xl font-bold text-foreground mb-4">
              Core Capabilities
            </h3>
            <ul className="space-y-3">
              {capabilities.map((cap, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground/90">{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
            Contact Our Indian Semiconductor Engineering Firm
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            As a global semiconductor services provider, we'd love to hear from you. Have a project in mind or want to learn more?
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <div className="md:col-span-2 space-y-8">
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
                  href="tel:+1234567890"
                  className="text-primary font-medium hover:underline"
                >
                  +1 (234) 567-890
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
          <form className="md:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Project Inquiry" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                rows={5}
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Send Message
            </Button>
          </form>
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
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
