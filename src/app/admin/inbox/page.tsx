'use client';

import { useCollection, useFirestore } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type Submission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submissionDate: {
    seconds: number;
    nanoseconds: number;
  } | null;
};

const formatDate = (timestamp: Submission['submissionDate']) => {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp.seconds * 1000);
  return format(date, 'MMM d, yyyy, h:mm a');
};

function SubmissionItem({ submission }: { submission: Submission }) {
    const initial = submission.name ? submission.name.charAt(0).toUpperCase() : '?';

    return (
        <AccordionItem value={submission.id}>
        <AccordionTrigger className="w-full text-left hover:no-underline">
            <div className="flex items-center gap-4 w-full pr-4">
                 <Avatar>
                    <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 flex-1">
                    <div className='flex justify-between'>
                        <p className="font-semibold">{submission.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {formatDate(submission.submissionDate)}
                        </p>
                    </div>
                     <p className="text-xs text-muted-foreground">{submission.email}</p>
                    <p className="font-medium text-sm truncate">{submission.subject}</p>
                </div>
            </div>

        </AccordionTrigger>
        <AccordionContent className="p-4 bg-muted/50 rounded-b-md">
            <p className='text-sm text-foreground/90'>{submission.message}</p>
        </AccordionContent>
        </AccordionItem>
    );
}


export default function InboxPage() {
  const firestore = useFirestore();
  const submissionsCollection = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'contact_form_submissions'), orderBy('submissionDate', 'desc'))
        : null,
    [firestore]
  );
  const { data: submissions, isLoading } = useCollection<Omit<Submission, 'id'>>(submissionsCollection);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            View messages submitted through the contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {isLoading && <p>Loading messages...</p>}
            {!isLoading && submissions?.length === 0 && <p>No messages yet.</p>}
            {submissions?.map((submission) => (
                <SubmissionItem key={submission.id} submission={submission} />
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
