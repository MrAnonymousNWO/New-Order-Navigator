
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInput,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/app/sidebar-nav';
import {
  Globe,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function AppSidebar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the Google Search box only renders on the client,
    // preventing a hydration mismatch error.
    setIsClient(true);
  }, []);

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          {isClient && <div className="gcse-searchbox-only" data-resultsurl="/search"></div>}
          <div className="flex items-center gap-3 pt-4">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-xl font-semibold">
              New Order Navigator
            </h1>
          </div>
          <div className="pt-4">
            <SidebarInput 
              placeholder="Filter navigation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav searchTerm={searchTerm} />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
