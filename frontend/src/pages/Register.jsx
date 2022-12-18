import React, { useState } from 'react';

// libraries
import axios from 'axios';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

// redux
import { LOGIN } from '../features/authSlice';

const Register = () => {
  // redux
  const dispatch = useDispatch();

  // register states
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  // register function
  const handleRegister = async (values) => {
    setRegisterError(null);
    setIsRegisterLoading(true);

    axios
      .post('api/auth/register', values)
      .then((response) => {
        dispatch(LOGIN(response.data));
      })
      .catch((error) => {
        setRegisterError(error.response.data.error);
      })
      .finally(() => {
        setIsRegisterLoading(false);
      });
  };

  // register form
  const formik = useFormik({
    initialValues: {
      emailAddress: '',
      password: '',
      confirmPassword: '',
    },
    validate: registerValidate,
    onSubmit: handleRegister,
  });

  return (
    <form
      className="card py-4 px-3 mx-auto"
      onSubmit={formik.handleSubmit}
      style={{ maxWidth: '400px' }}
    >
      <div className="card-body">
        <h3>Register</h3>

        {registerError && (
          <div className="alert alert-danger" role="alert">
            {registerError}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="emailAddress">Email Address</label>
          <input
            className={`form-control form-control-lg ${
              formik.errors.emailAddress &&
              formik.touched.emailAddress &&
              'invalid'
            }`}
            id="emailAddress"
            type="text"
            {...formik.getFieldProps('emailAddress')}
          />
          {formik.errors.emailAddress && formik.touched.emailAddress && (
            <div className="form-text text-danger">
              {formik.errors.emailAddress}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            className={`form-control form-control-lg ${
              formik.errors.password && formik.touched.password && 'invalid'
            }`}
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="form-text text-danger">
              {formik.errors.password}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className={`form-control form-control-lg ${
              formik.errors.confirmPassword &&
              formik.touched.confirmPassword &&
              'invalid'
            }`}
            id="confirmPassword"
            type="password"
            {...formik.getFieldProps('confirmPassword')}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <div className="form-text text-danger">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            className="btn btn-lg btn-dark"
            type="submit"
            disabled={isRegisterLoading}
          >
            {isRegisterLoading ? (
              <>
                <span className="spinner-grow spinner-grow-sm me-2"></span>
                Loading...
              </>
            ) : (
              <>Submit</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;

// register validation
const registerValidate = (values) => {
  const errors = {};

  // check if username is not empty
  if (!values.emailAddress) {
    errors.emailAddress = 'Required';
  } else if (!/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(values.emailAddress)) {
    errors.emailAddress = 'Invalid email address';
  }

  // check if password is not empty
  if (!values.password) {
    errors.password = 'Required';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/.test(values.password)
  ) {
    errors.password =
      'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
  }

  // check if confirm password is not empty
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Incorrect confirm password';
  }

  return errors;
};
