import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import ErrorPage from '@/components/ErrorPage';
import { AuthPage } from '@/features/users/AuthPage';
import DashboardPage from '@/features/compute/DashboardPage';
import PersistAuth from '@/layouts/PersistAuth';
import ProfilePage from '@/features/users/ProfilePage';
import ResourcePage from '@/features/compute/ResourcePage';
import SettingsPage from '@/features/settings/SettingsPage';
import HomePage from '@/features/users/Home/HomePage';
import ProjectsPage from '@/features/compute/ProjectsPage';
import ProjectPage from '@/features/compute/ProjectPage';
import VerifyPage from '@/features/users/VerifyPage';
import { Toaster } from 'sonner';

function App() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/auth',
      element: <AuthPage />,
    },
    {
      path: '/auth/verify',
      element: <VerifyPage />,
    },
    {
      element: <PersistAuth />,
      children: [
        {
          element: <DashboardLayout />,
          errorElement: <ErrorPage />,
          children: [
            { path: '/dashboard', element: <DashboardPage /> },
            { path: '/projects', element: <ProjectsPage /> },
            { path: '/projects/:id', element: <ProjectPage /> },
            { path: '/resource/:id', element: <ResourcePage /> },
            { path: '/profile', element: <ProfilePage /> },
            { path: '/settings', element: <SettingsPage /> },
          ],
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position='top-right'
        theme='dark'
        richColors
      />
    </>
  );
}

export default App;
