// ProtectedRoute.tsx

import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ ...rest }) => {
  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      element={cookies.accessToken ? <Outlet /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
