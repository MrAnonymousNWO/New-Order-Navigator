
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import {
  Globe,
  Code,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

export function AppSidebar() {
  const [isEmbedDialogOpen, setIsEmbedDialogOpen] = useState(false);
  const { toast } = useToast();

  const embedCode = `<iframe src="${
    typeof window !== 'undefined' ? window.location.origin : ''
  }" width="100%" height="800" style="border:none;" allowfullscreen></iframe>`;

  const handleCopyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      toast({
        title: 'Copied to Clipboard',
        description: 'The embed code has been copied.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Copy Failed',
        description: 'Could not copy the embed code.',
      });
    }
  };


  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-xl font-semibold">
              Sovereign Navigator
            </h1>
          </div>
           <div className="flex items-center gap-2 pt-2">
            <div className="gcse-searchbox-only"></div>
            <Button variant="ghost" size="icon" onClick={() => setIsEmbedDialogOpen(true)}>
              <Code className="h-5 w-5" />
              <span className="sr-only">Embed App</span>
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav searchQuery="" />
        </SidebarContent>
      </Sidebar>
       <AlertDialog
        open={isEmbedDialogOpen}
        onOpenChange={setIsEmbedDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Embed This App</AlertDialogTitle>
            <AlertDialogDescription>
              Copy and paste this HTML code into your website to embed the Sovereign Navigator.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            readOnly
            value={embedCode}
            className="my-4 h-32 resize-none bg-muted font-code"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <Button onClick={handleCopyEmbedCode}>Copy Code</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
