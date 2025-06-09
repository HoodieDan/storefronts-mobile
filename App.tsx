import { StatusBar } from 'expo-status-bar';
import AppContent from 'components/AppContent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      retry: 0,
      staleTime: 60 * 1000,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <AppContent />
    </QueryClientProvider>
  );
}