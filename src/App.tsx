import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import ErrorPage from '@/components/ErrorPage';
import { AuthPage } from '@/features/users/AuthPage';
import DashboardPage from '@/features/compute/DashboardPage';
import PersistAuth from '@/layouts/PersistAuth';
import NewListingPage from '@/features/compute/NewListingPage';
import ProfilePage from '@/features/users/ProfilePage';
import ListingDetailPage from '@/features/compute/ListingDetailPage';
import ChatPage from '@/features/billing/ChatPage';
import SettingsPage from '@/features/settings/SettingsPage';
import HomePage from '@/features/users/HomePage';

function App() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/email',
      element: <AuthPage />,
    },
    {
      element: <PersistAuth />,
      children: [
        {
          element: <RootLayout />,
          errorElement: <ErrorPage />,
          children: [
            { path: '/dashboard', element: <DashboardPage /> },
            { path: '/listing/:id', element: <ListingDetailPage /> },
            { path: '/listings/new', element: <NewListingPage /> },
            { path: '/profile', element: <ProfilePage /> },
            { path: '/chats', element: <ChatPage /> },
            { path: '/settings', element: <SettingsPage /> },
          ],
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
