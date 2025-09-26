
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInput,
  SidebarSeparator,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Globe, Search, Printer, Languages } from 'lucide-react';
import { useState } from 'react';

export function AppSidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleTranslate = () => {
    const currentUrl = window.location.href;
    const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=en&u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(googleTranslateUrl, '_blank', 'noopener,noreferrer');
  };

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
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handlePrint}>
              <Printer />
              <span>Print / Download PDF</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleTranslate}>
              <Languages />
              <span>Translate Page</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
