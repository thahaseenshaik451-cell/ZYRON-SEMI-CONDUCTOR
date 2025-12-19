'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCollection } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useMemoFirebase } from '@/firebase/provider';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  Inbox,
  LayoutDashboard,
  Settings,
  LucideIcon
} from 'lucide-react';
import InboxPage from './inbox/page';


type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  imageUrl: string;
  imageHint: string;
};

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/inbox', label: 'Inbox', icon: Inbox },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

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
        <Button onClick={handleSignOut} variant="outline">
          Sign Out
        </Button>
      </div>
    </header>
  );
}

function AdminNav() {
    const pathname = usePathname();
    return (
        <nav className="flex flex-col gap-2">
            {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                <Link key={link.href} href={link.href}>
                    <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
                        <Icon className="mr-2 h-4 w-4" />
                        {link.label}
                    </Button>
                </Link>
            )})}
        </nav>
    );
}

function ServiceForm({ service, onSave, onOpenChange }: { service?: Service | null; onSave: (serviceData: Omit<Service, 'id'>) => void; onOpenChange: (open: boolean) => void; }) {
    const [name, setName] = useState(service?.name || '');
    const [description, setDescription] = useState(service?.description || '');
    const [icon, setIcon] = useState(service?.icon || '');
    const [imageUrl, setImageUrl] = useState(service?.imageUrl || 'https://picsum.photos/seed/service1/600/400');
    const [imageHint, setImageHint] = useState(service?.imageHint || 'abstract technology');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, description, icon, imageUrl, imageHint });
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                <DialogDescription>
                    {service ? 'Update the details of your service.' : 'Fill in the details for the new service.'}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="Service Name" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" placeholder="Service Description" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="icon" className="text-right">Icon</Label>
                    <Input id="icon" value={icon} onChange={(e) => setIcon(e.target.value)} className="col-span-3" placeholder="e.g., Cpu" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
                    <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="col-span-3" placeholder="https://picsum.photos/seed/service1/600/400" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imageHint" className="text-right">Image Hint</Label>
                    <Input id="imageHint" value={imageHint} onChange={(e) => setImageHint(e.target.value)} className="col-span-3" placeholder="e.g., abstract technology" />
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
            </DialogFooter>
        </form>
    );
}

function ServicesManager() {
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading } = useCollection<Omit<Service, 'id'>>(servicesCollection);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleSaveService = (serviceData: Omit<Service, 'id'>) => {
    if (selectedService) {
      const serviceRef = doc(firestore, 'services', selectedService.id);
      updateDocumentNonBlocking(serviceRef, serviceData);
    } else {
      addDocumentNonBlocking(servicesCollection, serviceData);
    }
    setDialogOpen(false);
    setSelectedService(null);
  };
  
  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedService(null);
    setDialogOpen(true);
  };

  const handleDelete = (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const serviceRef = doc(firestore, 'services', serviceId);
      deleteDocumentNonBlocking(serviceRef);
    }
  };


  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Services</h2>
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={handleAddNew}>Add New Service</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                   <ServiceForm service={selectedService} onSave={handleSaveService} onOpenChange={setDialogOpen} />
                </DialogContent>
            </Dialog>
        </div>
      <Card>
        <CardContent className="p-0">
         <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading && <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>}
                {!isLoading && services?.map((service) => (
                <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{service.icon}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>Edit</Button>
                        <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(service.id)}>Delete</Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminContent() {
    const pathname = usePathname();

    if (pathname === '/admin/inbox') {
        return <InboxPage />;
    }
    
    if (pathname === '/admin') {
        return <ServicesManager />;
    }

    if(pathname === '/admin/settings') {
        return <div>Settings Page</div>
    }

    return <div>Page not found</div>
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
    <div className="flex flex-col min-h-dvh bg-muted/40 text-foreground">
      <AdminHeader />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-[240px_1fr] gap-8">
            <aside>
                <AdminNav />
            </aside>
            <div>
                <AdminContent />
            </div>
        </div>
      </main>
    </div>
  );
}
