import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import StoreProvider from './context/StoreContext.jsx';
import ToastHost from './components/ToastHost.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Suspense fallback={<div className="min-h-screen bg-white" />}> 
          <AppRoutes />
        </Suspense>
        <ToastHost />
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;

