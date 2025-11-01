import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import ErrorPage from '@/components/ErrorPage';
import { AuthPage } from '@/features/auth/AuthPage';
import ListingPage from '@/features/listings/ListingPage';
import PersistAuth from '@/layouts/PersistAuth';
import NewListingPage from '@/features/listings/NewListingPage';
import ProfilePage from '@/features/auth/ProfilePage';
import ListingDetailPage from '@/features/listings/ListingDetailPage';
import ChatPage from '@/features/chat/ChatPage';
import WishlistPage from '@/features/wishlist/WishlistPage';
import SettingsPage from '@/features/settings/SettingsPage';

function App() {
  const routes: RouteObject[] = [
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
            { path: '/', element: <ListingPage /> },
            { path: '/listing/:id', element: <ListingDetailPage /> },
            { path: '/listings/new', element: <NewListingPage /> },
            { path: '/profile', element: <ProfilePage /> },
            { path: '/chats', element: <ChatPage /> },
            { path: '/wishlists', element: <WishlistPage /> },
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
