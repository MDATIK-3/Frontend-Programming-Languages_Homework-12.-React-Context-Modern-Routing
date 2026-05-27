import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './router';
import { UiPreferencesProvider } from './context/UiPreferencesContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UiPreferencesProvider>
      <RouterProvider router={router} />
    </UiPreferencesProvider>
  </StrictMode>,
);
