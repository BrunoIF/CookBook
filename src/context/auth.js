import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useMutation } from '@apollo/client';

import { VERIFY_TOKEN, GET_AUTH_TOKEN } from 'queries/authentication';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [
    verifyUser,
    { data: verifyTokenData, called: verifyTokenCalled },
  ] = useMutation(VERIFY_TOKEN);
  const [
    getAuthToken,
    { data: loginData, error, loginError, called: loginCalled },
  ] = useMutation(GET_AUTH_TOKEN);

  useEffect(() => {
    function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        verifyUser({ variables: { token } });
      }
    }
    loadUserFromCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (verifyTokenCalled) {
      if (verifyTokenData) {
        const user = verifyTokenData?.verifyToken.payload?.username;
        if (user) setUser(user);
      }
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyTokenData]);

  const login = (username, password) => {
    getAuthToken({ variables: { username, password } });
  };

  useEffect(() => {
    if (loginCalled) {
      if (!loginError && loginCalled) {
        const token = loginData?.tokenAuth?.token;
        const user = loginData?.tokenAuth?.payload.username;

        setUser(user);
        Cookies.set('token', token);
        Router.push('/');
      } else {
        console.log('error', error);
      }
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData, loginError]);

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading</h1>;
  } else {
    const isLoginPage = window.location.pathname === '/login';

    if (!isAuthenticated && !isLoginPage) {
      window.location.href = '/login';
      return;
    }
  }

  return children;
};
