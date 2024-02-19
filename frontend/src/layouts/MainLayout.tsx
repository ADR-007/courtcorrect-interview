import { Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';


export default function MainLayout() {
  return (
    <Stack direction="column" spacing={0} alignItems="stretch">
      <Stack direction="row" spacing={2} alignItems="stretch">
        <Sidebar />
        <Stack direction="column" spacing={2} flexGrow={1} alignItems="center">
          <Header />
          <Main>
            <Outlet />
          </Main>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
}