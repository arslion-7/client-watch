import React from 'react';
import { Route, Routes } from 'react-router';
import { PATHS } from './paths';

import App from '@/App';
import AuthLayout from '@/layouts/AuthLayout';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route element={<AuthLayout />}>
        <Route path={PATHS.SIGNUP} element={<SignUp />} />
        <Route path={PATHS.SIGNIN} element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
