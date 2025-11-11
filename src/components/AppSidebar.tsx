import * as React from 'react';
import { GalleryVerticalEnd } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar';

('use client');

import { MoreHorizontal, type LucideIcon } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarGroup, useSidebar } from '@/components/ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <DropdownMenu key={item.title}>
            <SidebarMenuItem>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                  {item.title} <MoreHorizontal className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              {item.items?.length ? (
                <DropdownMenuContent
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                  className='min-w-56 rounded-lg'>
                  {item.items.map((item) => (
                    <DropdownMenuItem
                      asChild
                      key={item.title}>
                      <a href={item.url}>{item.title}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              ) : null}
            </SidebarMenuItem>
          </DropdownMenu>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const data = {
  navMain: [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Installation',
          url: '#',
        },
        {
          title: 'Project Structure',
          url: '#',
        },
      ],
    },
    {
      title: 'Building Your Application',
      url: '#',
      items: [
        {
          title: 'Routing',
          url: '#',
        },
        {
          title: 'Data Fetching',
          url: '#',
          isActive: true,
        },
        {
          title: 'Rendering',
          url: '#',
        },
        {
          title: 'Caching',
          url: '#',
        },
        {
          title: 'Styling',
          url: '#',
        },
        {
          title: 'Optimizing',
          url: '#',
        },
        {
          title: 'Configuring',
          url: '#',
        },
        {
          title: 'Testing',
          url: '#',
        },
        {
          title: 'Authentication',
          url: '#',
        },
        {
          title: 'Deploying',
          url: '#',
        },
        {
          title: 'Upgrading',
          url: '#',
        },
        {
          title: 'Examples',
          url: '#',
        },
      ],
    },
    {
      title: 'API Reference',
      url: '#',
      items: [
        {
          title: 'Components',
          url: '#',
        },
        {
          title: 'File Conventions',
          url: '#',
        },
        {
          title: 'Functions',
          url: '#',
        },
        {
          title: 'next.config.js Options',
          url: '#',
        },
        {
          title: 'CLI',
          url: '#',
        },
        {
          title: 'Edge Runtime',
          url: '#',
        },
      ],
    },
    {
      title: 'Architecture',
      url: '#',
      items: [
        {
          title: 'Accessibility',
          url: '#',
        },
        {
          title: 'Fast Refresh',
          url: '#',
        },
        {
          title: 'Next.js Compiler',
          url: '#',
        },
        {
          title: 'Supported Browsers',
          url: '#',
        },
        {
          title: 'Turbopack',
          url: '#',
        },
      ],
    },
  ],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              asChild>
              <a href='#'>
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <GalleryVerticalEnd className='size-4' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-medium'>Documentation</span>
                  <span className=''>v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className='p-1'>
          <p>Hello</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
