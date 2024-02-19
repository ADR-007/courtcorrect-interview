import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PATH } from './paths';

import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';
import QuickSearch from '../pages/QuickSearch';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/search" replace />,
  },
  {
    path: PATH.search,
    element: (<MainLayout />),
    children: [
      { path: '', element: <QuickSearch /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
