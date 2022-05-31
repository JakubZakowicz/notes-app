import React from 'react';
import './index.css';
import App from './App';
import { render } from "react-dom"; 
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
, document.getElementById("root"));