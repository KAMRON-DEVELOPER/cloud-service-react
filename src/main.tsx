import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider
      storageKey='theme'
      defaultTheme='system'
      attribute='class'
      enableSystem>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </Provider>
);
