import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Settings, LogOut, ChevronsUpDown, ChevronRight } from 'lucide-react';
import { useLogoutMutation } from '@/services/auth';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout as logoutAction } from '@/features/users/authSlice';
import { useGetProjectsQuery } from '@/services/compute';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PoddleSvg from '@/assets/icons/PoddleSvg';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [projectsOpen, setProjectsOpen] = useState(true);

  // Get user data from Redux store
  const user = useAppSelector((state) => state.auth.user);
  const balance = useAppSelector((state) => state.stats?.balance) || 0;

  // Fetch projects
  const { data: projectsData } = useGetProjectsQuery();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
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
      <Sidebar variant='sidebar'>
        {/* Sidebar Header - Brand with toggle functionality */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size='lg'
                asChild
                className='hover:bg-sidebar-accent cursor-pointer'>
                <BrandTrigger />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Dashboard */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath('/dashboard')}
                    tooltip='Dashboard'>
                    <Link to='/dashboard'>
                      <LayoutDashboard className='w-4 h-4' />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Projects - Collapsible */}
                <Collapsible
                  open={projectsOpen}
                  onOpenChange={setProjectsOpen}
                  className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip='Projects'
                        isActive={isActivePath('/projects') || isActivePath('/project/')}>
                        <FolderKanban className='w-4 h-4' />
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
        </SidebarContent>

        {/* Sidebar Footer - User profile with balance */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size='lg'
                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                    <Avatar className='h-8 w-8 rounded-lg'>
                      <AvatarImage
                        src={user?.picture || ''}
                        alt={user?.username}
                      />
                      <AvatarFallback className='rounded-lg bg-blue-600 text-white'>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-semibold'>{user?.username || 'User'}</span>
                      <span className='truncate text-xs text-muted-foreground'>{formatBalance(balance)}</span>
                    </div>
                    <ChevronsUpDown className='ml-auto size-4' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                  side='bottom'
                  align='end'
                  sideOffset={4}>
                  <DropdownMenuLabel className='p-0 font-normal'>
                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                      <Avatar className='h-8 w-8 rounded-lg'>
                        <AvatarImage
                          src={user?.picture || ''}
                          alt={user?.username}
                        />
                        <AvatarFallback className='rounded-lg bg-blue-600 text-white'>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                      <div className='grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-semibold'>{user?.username || 'User'}</span>
                        <span className='truncate text-xs text-muted-foreground'>{user?.email || ''}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className='w-4 h-4 mr-2' />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className='w-4 h-4 mr-2' />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
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

// Brand trigger component that acts as sidebar toggle
const BrandTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div
      onClick={toggleSidebar}
      className='flex items-center gap-2 w-full'>
      <PoddleSvg className='w-8 h-8 text-primary' />
      <div className='flex flex-col gap-0.5'>
        <span className='text-lg font-bold'>Poddle</span>
        <span className='text-xs text-muted-foreground'>Cloud Platform</span>
      </div>
    </div>
  );
};
