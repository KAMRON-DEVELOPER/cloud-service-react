// src/layouts/SidebarLayout.tsx
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LayoutDashboard, FolderKanban, Server, Database, Settings, User, LogOut, Menu, X, ChevronDown, Activity, DollarSign } from 'lucide-react';
import { useLogoutMutation } from '@/services/auth';
import { useAppDispatch } from '@/store/store';
import { logout as logoutAction } from '@/features/users/authSlice';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className='w-5 h-5' />,
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: <FolderKanban className='w-5 h-5' />,
    },
    {
      name: 'Deployments',
      path: '/deployments',
      icon: <Server className='w-5 h-5' />,
    },
    {
      name: 'Resources',
      path: '/resources',
      icon: <Database className='w-5 h-5' />,
    },
    {
      name: 'Monitoring',
      path: '/monitoring',
      icon: <Activity className='w-5 h-5' />,
    },
    {
      name: 'Billing',
      path: '/billing',
      icon: <DollarSign className='w-5 h-5' />,
    },
  ];

  const bottomNavItems: NavItem[] = [
    {
      name: 'Profile',
      path: '/profile',
      icon: <User className='w-5 h-5' />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className='w-5 h-5' />,
    },
  ];

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) => (prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName]));
  };

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

  const NavItemComponent = ({ item }: { item: NavItem }) => {
    const isActive = isActivePath(item.path);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.name);

    return (
      <div>
        <Link
          to={hasChildren ? '#' : item.path}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpanded(item.name);
            } else {
              setSidebarOpen(false);
            }
          }}
          className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
            isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
          }`}>
          <div className='flex items-center gap-3'>
            {item.icon}
            <span className='font-medium'>{item.name}</span>
          </div>
          {hasChildren && <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />}
        </Link>

        {hasChildren && isExpanded && (
          <div className='ml-6 mt-1 space-y-1'>
            {item.children!.map((child) => (
              <Link
                key={child.path}
                to={child.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActivePath(child.path) ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}>
                {child.icon}
                <span className='text-sm'>{child.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='flex h-screen bg-gray-950'>
      {/* Sidebar for desktop */}
      <aside className='hidden lg:flex lg:flex-col lg:w-64 bg-gray-900 border-r border-gray-800'>
        {/* Logo */}
        <div className='p-6 border-b border-gray-800'>
          <Link
            to='/dashboard'
            className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-xl'>P</span>
            </div>
            <span className='text-xl font-bold text-white'>Poddle</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-4 py-6 space-y-2 overflow-y-auto'>
          {navItems.map((item) => (
            <NavItemComponent
              key={item.path}
              item={item}
            />
          ))}
        </nav>

        {/* Bottom navigation */}
        <div className='p-4 border-t border-gray-800 space-y-2'>
          {bottomNavItems.map((item) => (
            <NavItemComponent
              key={item.path}
              item={item}
            />
          ))}
          <button
            onClick={handleLogout}
            className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors'>
            <LogOut className='w-5 h-5' />
            <span className='font-medium'>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div
          className='fixed inset-0 bg-black/50'
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside className='fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 flex flex-col'>
          {/* Logo */}
          <div className='p-6 border-b border-gray-800 flex items-center justify-between'>
            <Link
              to='/dashboard'
              className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>P</span>
              </div>
              <span className='text-xl font-bold text-white'>Poddle</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className='text-gray-400 hover:text-white'>
              <X className='w-6 h-6' />
            </button>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-4 py-6 space-y-2 overflow-y-auto'>
            {navItems.map((item) => (
              <NavItemComponent
                key={item.path}
                item={item}
              />
            ))}
          </nav>

          {/* Bottom navigation */}
          <div className='p-4 border-t border-gray-800 space-y-2'>
            {bottomNavItems.map((item) => (
              <NavItemComponent
                key={item.path}
                item={item}
              />
            ))}
            <button
              onClick={handleLogout}
              className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors'>
              <LogOut className='w-5 h-5' />
              <span className='font-medium'>Logout</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Main content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Top bar */}
        <header className='bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between lg:justify-end'>
          <button
            onClick={() => setSidebarOpen(true)}
            className='lg:hidden text-gray-300 hover:text-white'>
            <Menu className='w-6 h-6' />
          </button>

          {/* You can add user profile dropdown or other header items here */}
          <div className='flex items-center gap-4'>{/* Add notifications, user avatar, etc. */}</div>
        </header>

        {/* Page content */}
        <main className='flex-1 overflow-y-auto bg-gray-950 p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
