import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Wrapper as GlobalWrapper, Title, Text } from 'styles/global';
import Button from 'components/Buttons/Button';
import Input from 'components/Input';
import { useAuth } from 'context/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleClick = () => {
    login(username, password);
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
