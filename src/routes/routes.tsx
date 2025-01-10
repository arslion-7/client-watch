import React from 'react';
import { Route, Routes } from 'react-router';
import { PATHS } from './paths';

import App from '@/App';
import AuthLayout from '@/layouts/AuthLayout';
import SignUp from '@/pages/auth/SignUp';
import SignIn from '@/pages/auth/SignIn';
// import MainPage from '@/pages/main/MainPage';
import Watches from '@/pages/watches/Watches';
import Watch from '@/pages/watch/Watch';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Watches />} />
        <Route path=':id' element={<Watch />} />
        {/* <Route index element={<MainPage />} /> */}
        {/* <Route path='watches'> */}
        {/* <Route index element={<Watches />} />
          <Route path=':id' element={<Watch />} /> */}
        {/* </Route> */}
      </Route>
      <Route element={<AuthLayout />}>
        <Route path={PATHS.SIGNUP} element={<SignUp />} />
        <Route path={PATHS.SIGNIN} element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
