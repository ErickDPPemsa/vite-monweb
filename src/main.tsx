import ReactDOM from 'react-dom/client'
import './presentation/styles/style.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner';
// import { RouterProvider } from 'react-router-dom';
// import { router } from './router/router';
import { App } from './presentation/App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster visibleToasts={3} toastOptions={{ className: 'toast', style: { backgroundColor: 'var(--surface)', borderColor: 'var(--primary)' } }} />
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
