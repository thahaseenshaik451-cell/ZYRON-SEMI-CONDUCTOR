'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCollection } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useMemoFirebase } from '@/firebase/provider';

type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

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

function ServiceForm({ service, onSave, onOpenChange }: { service?: Service | null; onSave: (serviceData: Omit<Service, 'id'>) => void; onOpenChange: (open: boolean) => void; }) {
    const [name, setName] = useState(service?.name || '');
    const [description, setDescription] = useState(service?.description || '');
    const [icon, setIcon] = useState(service?.icon || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, description, icon });
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
        <ServicesManager />
      </main>
    </div>
  );
}
