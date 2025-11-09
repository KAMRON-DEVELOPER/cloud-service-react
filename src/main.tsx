import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { Provider as CharkaProvider } from '@/components/ui/provider';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider
      storageKey='theme'
      defaultTheme='system'
      attribute='class'
      enableSystem>
      <CharkaProvider>
        <App />
      </CharkaProvider>
    </ThemeProvider>
  </Provider>
);
