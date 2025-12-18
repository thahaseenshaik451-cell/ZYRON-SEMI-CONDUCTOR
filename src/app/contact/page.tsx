'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

function ContactSection() {
    return (
      <section id="contact" className="py-16 md:py-24 pt-32 md:pt-40 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
              Contact Our Indian Chip Design Services Provider
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              As a global semiconductor engineering firm, we'd love to hear from you. Have a project in mind or want to learn more about our Zyron IC engineering?
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

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <Header />
            <main className="flex-1">
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
