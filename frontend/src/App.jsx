import React, { lazy } from 'react';

// libraries
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import HomeRoute from './routes/HomeRoute';
import UserRoute from './routes/UserRoute';
import HomeTemplate from './templates/HomeTemplate';
import UserTemplate from './templates/UserTemplate';

// pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Users = lazy(() => import('./pages/Users'));

const App = () => {
  const auth = useSelector((state) => state.auth.value);

  return (
    <Routes>
      <Route element={<HomeRoute auth={auth} />}>
        <Route element={<HomeTemplate />}>
          {!auth && <Route path="/" element={<Home />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      <Route element={<UserRoute auth={auth} />}>
        <Route element={<UserTemplate />}>
          {auth && <Route path="/" element={<Dashboard />} />}
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
