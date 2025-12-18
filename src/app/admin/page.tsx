'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';

function AdminHeader() {
    const auth = getAuth();
    const router = useRouter();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            router.push('/login');
        });
    };

    return (
        <header className="bg-card border-b">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <Logo />
                <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
            </div>
        </header>
    );
}


export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <AdminHeader />
        <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
            <p>Welcome to the admin panel. Here you can manage your site's content.</p>
        </main>
    </div>
  );
}
