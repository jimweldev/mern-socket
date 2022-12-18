import React, { Suspense } from 'react';

// libararies
import { Link, NavLink, Outlet } from 'react-router-dom';

// components
import Loading from '../components/Loading';

const HomeTemplate = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white mb-5">
        <div className="container">
          <Link className="navbar-brand text-dark" to="/">
            MERN Auth
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
            </ul>

            <div>
              <Link className="btn btn-outline-dark me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-dark" to="register">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default HomeTemplate;
