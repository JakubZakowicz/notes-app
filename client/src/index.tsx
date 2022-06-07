import React from 'react';
import './index.css';
import App from './App';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { isAuthenticated, addAuthHeader } from './utils/auth';

const queryClient = new QueryClient();

if (isAuthenticated()) addAuthHeader();

render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
