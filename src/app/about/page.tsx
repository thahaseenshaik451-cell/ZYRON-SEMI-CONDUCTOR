'use client';

import { Check, Linkedin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

function AboutSection() {
    const capabilities = [
      'Next-Generation Silicon Solutions',
      'AI-Enabled Silicon Development',
      'Low-Power Semiconductor Solutions',
      'High-Performance Chip Development',
      'Advanced Verification Methodologies',
    ];
  
    return (
      <section id="about" className="py-16 md:py-24 pt-32 md:pt-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
              <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground">
                A Customer-Focused Chip Design Company
              </h2>
              <div className="mt-6 space-y-6 text-muted-foreground">
                <div>
                  <h3 className="font-headline text-xl font-semibold text-foreground mb-2">
                    Our Mission
                  </h3>
                  <p>
                    To empower our clients with industry-standard semiconductor services that push the boundaries of technology, driving progress and creating a smarter, more connected world through precision-driven chip engineering.
                  </p>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-semibold text-foreground mb-2">
                    Our Vision
                  </h3>
                  <p>
                    To be the world&apos;s most trusted partner for professional silicon design and validation, recognized for our unwavering commitment to innovation and quality for startups and enterprises.
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

function TeamSection() {
  const teamMembers = [
    {
      name: 'Dr. Alok Sharma',
      role: 'Founder & CEO',
      imageUrl: 'https://picsum.photos/seed/team1/400/400',
      imageHint: 'male portrait professional',
      bio: 'Visionary leader with 20+ years in semiconductor innovation.',
    },
    {
      name: 'Priya Singh',
      role: 'VP of Engineering',
      imageUrl: 'https://picsum.photos/seed/team2/400/400',
      imageHint: 'female portrait professional',
      bio: 'Expert in leading high-performance engineering teams.',
    },
    {
      name: 'Rahul Verma',
      role: 'Principal Architect',
      imageUrl: 'https://picsum.photos/seed/team3/400/400',
      imageHint: 'man portrait professional',
      bio: 'Specialist in low-power and high-speed chip architecture.',
    },
  ];

  return (
    <section id="team" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground">
            Meet Our Leadership Team
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The driving force behind our innovation and success.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden text-center bg-background">
              <div className="relative h-64 w-full">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  data-ai-hint={member.imageHint}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-headline font-bold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
                <p className="mt-2 text-muted-foreground text-sm">{member.bio}</p>
                <div className="mt-4">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5 mx-auto" />
                    </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AboutSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
