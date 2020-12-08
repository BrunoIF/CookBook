import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import { VERIFY_TOKEN, GET_AUTH_TOKEN } from 'queries/authentication';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [verifyUser, { data: verifyTokenData }] = useMutation(VERIFY_TOKEN);
  const [getAuthToken, { data: loginData, error: loginError }] = useMutation(
    GET_AUTH_TOKEN,
  );

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
    if (verifyTokenData) {
      const user = verifyTokenData?.verifyToken.payload?.username;
      if (user) setUser(user);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyTokenData]);

  const login = (username, password) => {
    getAuthToken({ variables: { username, password } });
  };

  useEffect(() => {
    console.log('data', loginData);
    if (loginData) {
      const token = loginData?.tokenAuth?.token;
      const user = loginData?.tokenAuth?.payload.username;

      setUser(user);
      Cookies.set('token', token);
      router.push('/');
      console.log('should push to /');
    } else {
      console.log('error', loginError);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData, loginError]);

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
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
  const router = useRouter();

  if (isLoading) {
    return <h1>Loading</h1>;
  } else {
    const isLoginPage = window.location.pathname === '/login';

    if (!isAuthenticated && !isLoginPage) {
      router.push('/login');
    }
  }

  return children;
};
