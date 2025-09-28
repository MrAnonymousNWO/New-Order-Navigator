
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/app/sidebar-nav';
import {
  Globe,
} from 'lucide-react';

export function AppSidebar() {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="gcse-searchbox-only" data-resultsUrl="/search"></div>
          <div className="flex items-center gap-3 pt-4">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-xl font-semibold">
              New Order Navigator
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
