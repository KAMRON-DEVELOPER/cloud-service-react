import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Server, Database, Activity, DollarSign, Settings, LogOut, ChevronsUpDown, CreditCard, UserCircle } from 'lucide-react';
import { useLogoutMutation } from '@/services/auth';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout as logoutAction } from '@/features/users/authSlice';
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
  SidebarProvider,
  SidebarTrigger,
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

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  // Get user data from Redux store
  const user = useAppSelector((state) => state.auth.user);
  const balance = useAppSelector((state) => state.stats?.balance) || 0;

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className='w-4 h-4' />,
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: <FolderKanban className='w-4 h-4' />,
    },
    {
      name: 'Deployments',
      path: '/deployments',
      icon: <Server className='w-4 h-4' />,
    },
    {
      name: 'Resources',
      path: '/resources',
      icon: <Database className='w-4 h-4' />,
    },
    {
      name: 'Monitoring',
      path: '/monitoring',
      icon: <Activity className='w-4 h-4' />,
    },
    {
      name: 'Billing',
      path: '/billing',
      icon: <DollarSign className='w-4 h-4' />,
    },
  ];

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
      <div className='flex min-h-screen w-full'>
        <Sidebar variant='sidebar'>
          {/* Sidebar Header */}
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <ToggleTrigger />
                <Link
                  to='/dashboard'
                  className='flex items-center gap-2 px-2 py-2'>
                  <span className='text-xl font-bold'>Poddle</span>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          {/* Sidebar Content */}
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActivePath(item.path)}
                        tooltip={item.name}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          {/* Sidebar Footer */}
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
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <UserCircle className='w-4 h-4 mr-2' />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/billing')}>
                      <CreditCard className='w-4 h-4 mr-2' />
                      Billing
                    </DropdownMenuItem>
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
        {/* <SidebarInset> */}
        <div className='flex-1 flex flex-col overflow-hidden'>
          {/* Page Content */}
          <main className='flex-1 overflow-y-auto p-6'>
            <Outlet />
          </main>
        </div>
        {/* </SidebarInset> */}
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

const ToggleTrigger = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <PoddleSvg
      className='w-6 h-6 text-primary'
      onClick={toggleSidebar}
    />
  );
};
