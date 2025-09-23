'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Globe } from 'lucide-react';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-xl font-semibold">
            Sovereign Navigator
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
    </Sidebar>
  );
}
