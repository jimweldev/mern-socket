import React from 'react';

// libraries
import { Navigate, Outlet } from 'react-router-dom';

const HomeRoute = ({ auth }) => {
  if (!auth) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace={true} />;
  }
};

export default HomeRoute;
