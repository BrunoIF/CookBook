import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import { GET_AUTH_TOKEN } from 'queries/authentication';
import { Wrapper as GlobalWrapper, Title, Text } from 'styles/global';
import Button from 'components/Buttons/Button';
import Input from 'components/Input';

function Login() {
  const [getAuthToken, { data, error, called }] = useMutation(GET_AUTH_TOKEN);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (called) {
      if (!error && called) {
        console.log('data', data);
        const token = data?.tokenAuth?.token;

        const authInfo = {
          token,
          username,
        };
        localStorage.removeItem('cookbook_auth');
        localStorage.setItem('cookbook_auth', JSON.stringify(authInfo));
        router.push('/');
      } else {
        alert('error!', error);
        console.log('error', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const handleClick = () => {
    getAuthToken({ variables: { username, password } });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <GlobalWrapper>
        <Title>Login</Title>
        <Text>Username:</Text>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        <Text>Password:</Text>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button
          css={{ marginTop: '30px' }}
          text="Login"
          disabled={!username || !password}
          onClick={handleClick}
        />
      </GlobalWrapper>
    </>
  );
}

export default Login;
