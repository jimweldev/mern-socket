import React from 'react';

// libraries
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// redux
import { store } from './app/store';

// axios
import './axios/instance';

// components
import App from './App';

// others
import 'bootstrap/dist/css/bootstrap.min.css';
import '@adminkit/core/dist/css/app.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
