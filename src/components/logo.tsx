import { Waves } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className, isTransparent }: { className?: string; isTransparent?: boolean }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <Waves className="h-6 w-6 text-primary" />
      <span className={cn(
        "text-xl font-bold font-headline tracking-tighter",
        isTransparent ? "text-white" : "text-foreground"
        )}>
        ZYRON
      </span>
    </Link>
  );
}
