"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#services', label: 'Services' },
    { href: '/#features', label: 'Features' },
    { href: '/#contact', label: 'Contact' },
    { href: '/about', label: 'About' },
  ];

  const headerIsTransparent = (pathname === '/' || pathname.startsWith('/#')) && !hasScrolled;

  const isLinkActive = (href: string) => {
    if (pathname === '/' && href === '/#home') return true;
    if (href.includes('#')) {
        const [path, hash] = href.split('#');
        if (path === '' || path === '/') {
            // It's an anchor on the homepage
            if(pathname === '/') {
                // We're on the homepage, check hash later
            } else {
                return false;
            }
        } else if (pathname !== path) {
            return false;
        }
    }
    return pathname === href;
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      headerIsTransparent ? "bg-transparent" : "bg-card/95 shadow-md backdrop-blur-sm"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={cn(
              "transition-colors",
              isLinkActive(link.href) ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
              )}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild>
            <Link href="/#contact">Get Started</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-card">
              <div className="flex flex-col h-full p-4">
                <div className="flex justify-between items-center mb-8">
                  <Logo />
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-6 text-lg font-medium">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className={cn(
                        "transition-colors",
                        isLinkActive(link.href) ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
                      )} onClick={() => setMobileMenuOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-auto">
                  <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
