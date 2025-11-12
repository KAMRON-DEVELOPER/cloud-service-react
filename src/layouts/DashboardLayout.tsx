import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Settings, ChevronRight, Rocket } from 'lucide-react';
import { useLogoutMutation } from '@/services/auth';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout as logoutAction } from '@/features/users/authSlice';
import { useGetProjectsQuery } from '@/services/compute';
import { LuLayoutDashboard } from 'react-icons/lu';
import { useState, type ComponentProps } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import PoddleSvg from '@/assets/icons/PoddleSvg';

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarMenu onClick={toggleSidebar}>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
          <div className='flex aspect-square size-8 items-center justify-center'>
            <PoddleSvg className='size-6 text-primary' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium text-primary'>Poddle</span>
            <span className='truncate text-xs text-secondary'>Cloud Platform</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const Content = () => {
  const location = useLocation();
  const [projectsOpen, setProjectsOpen] = useState(true);

  const { data: projectsData } = useGetProjectsQuery();

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* Dashboard */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActivePath('/dashboard')}
              tooltip='Dashboard'>
              <Link to='/dashboard'>
                <LuLayoutDashboard className='size-4' />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible
            asChild
            defaultOpen={true}
            className='group/collapsible'>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip='Projects'
                  isActive={isActivePath('/projects') || isActivePath('/project/')}>
                  <Rocket className='size-4' />
                  <span>Projects</span>
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {projectsData?.data.map((project) => (
                    <SidebarMenuSubItem key={project.id}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname === `/project/${project.id}`}>
                        <Link to={`/project/${project.id}`}>
                          <span>{project.name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* Settings */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActivePath('/settings')}
              tooltip='Settings'>
              <Link to='/settings'>
                <Settings className='w-4 h-4' />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const Footer = () => {
  return <></>;
};

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <Content />
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const user = useAppSelector((state) => state.auth.user);
  const balance = useAppSelector((state) => state.stats?.balance) || 0;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserInitials = () => {
    if (!user?.username) return 'U';
    return user.username
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <SidebarProvider>
      <AppSidebar
        variant='sidebar'
        collapsible='icon'
      />
      <SidebarInset>
        {/* Empty header without breadcrumbs and trigger */}
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>{/* Empty - just spacing */}</header>
        <div className='flex-1 flex flex-col overflow-hidden'>
          {/* Page Content */}
          <main className='flex-1 overflow-y-auto p-6'>
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
