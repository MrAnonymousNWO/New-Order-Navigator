
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInput,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import {
  Globe,
  Search,
} from 'lucide-react';
import { useState } from 'react';

export function AppSidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-xl font-semibold">
            Sovereign Navigator
          </h1>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <SidebarInput
            placeholder="Search..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav searchTerm={searchTerm} />
      </SidebarContent>
    </Sidebar>
  );
}
