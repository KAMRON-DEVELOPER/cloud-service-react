import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Settings, ChevronRight, Rocket, LogOut, CreditCard, BadgeCheck, ChevronsUpDown, type LucideIcon, LifeBuoy, Send } from 'lucide-react';
import { useGetProfileQuery, useLogoutMutation } from '@/services/auth';
import { useAppDispatch } from '@/store/store';
import { logout as logoutAction } from '@/features/users/authSlice';
import { useGetProjectsQuery } from '@/services/compute';
import { LuLayoutDashboard } from 'react-icons/lu';
import { type ComponentProps } from 'react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetBalanceQuery } from '@/services/billing';
import { PlusIcon } from '@heroicons/react/24/solid';
import CreateProjectDialog from '@/features/compute/CreateProjectDialog';

const Header = ({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarMenu>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarMenu
      {...props}
      onClick={toggleSidebar}>
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

const Content = ({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  const location = useLocation();
  // const [projectsOpen, setProjectsOpen] = useState(true);

  const { data: projects } = useGetProjectsQuery();

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <SidebarGroup {...props}>
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
                  isActive={isActivePath('/projects') || isActivePath('/projects/')}>
                  <Rocket className='size-4' />
                  <span>Projects</span>
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className='pt-0.5'>
                <SidebarMenuSub>
                  {/* Existing Projects */}
                  {projects?.data.map((project) => (
                    <SidebarMenuSubItem key={project.id}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname === `/projects/${project.id}`}>
                        <Link to={`/projects/${project.id}`}>
                          <span>{project.name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                  {/* Add Project Button */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <CreateProjectDialog
                        trigger={
                          <SidebarMenuSubButton>
                            <PlusIcon className='size-4' />
                            <span>Add Project</span>
                          </SidebarMenuSubButton>
                        }
                      />
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
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

const ContentFooter = ({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  const items = [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ];

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                size='sm'>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const Footer = ({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarMenu>) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { isMobile } = useSidebar();

  const { data: user, isLoading: userLoading } = useGetProfileQuery();
  const { data: balance, isLoading: balanceLoading } = useGetBalanceQuery();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (userLoading || balanceLoading) {
    return <div className='p-4'>Loading...</div>;
  }

  if (!user || !balance) {
    return <p>user or balance is null...</p>;
  }

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
    <SidebarMenu {...props}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={user?.picture || undefined}
                  alt={user.username}
                />
                <AvatarFallback className='rounded-lg'>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.username}</span>
                <span className='truncate text-xs'>{formatBalance(Number(balance.amount))}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}>
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={user.picture || undefined}
                    alt={user.username}
                  />
                  <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{user.username}</span>
                  <span className='truncate text-xs'>{formatBalance(Number(balance.amount))}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader className='bg-primary'>
        <Header />
      </SidebarHeader>
      <SidebarContent className='bg-primary'>
        <Content />
        <ContentFooter className='mt-auto' />
      </SidebarContent>
      <SidebarFooter className='bg-primary'>
        <Footer />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar
        variant='sidebar'
        collapsible='icon'
        className='bg-secondary'
      />
      <SidebarInset className='bg-secondary'>
        <div className='flex-1 flex flex-col overflow-hidden'>
          <main className='flex-1 overflow-y-auto'>
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
