'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Home, MessageSquare, User, Settings, LogOut } from 'lucide-react';
import { Icons } from './icons';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/settings', label: 'Profile Settings', icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="border-r" collapsible="icon">
          <SidebarHeader>
            <div className="flex h-10 items-center justify-between px-2">
              <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                <Icons.logo className="h-8 w-8 text-primary" />
                <span className="text-lg font-bold">SoulMate</span>
              </div>
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon" className="group-data-[collapsible=icon]:mx-auto" />
              </SidebarTrigger>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.startsWith(item.href)}
                      tooltip={item.label}
                    >
                      <a>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-2">
             <SidebarMenu>
                <SidebarMenuItem>
                   <Link href="/" legacyBehavior passHref>
                    <SidebarMenuButton asChild tooltip="Log Out">
                        <a>
                            <LogOut />
                            <span>Log Out</span>
                        </a>
                    </SidebarMenuButton>
                   </Link>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-background">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
