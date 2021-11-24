import React, { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import useStyles from '../utils/styles';
import { Store } from '../utils/store';
import axios from 'axios';
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from '@material-ui/core';
import Cookies from 'js-cookie';

export default function RegisterPage() {
  const classes = useStyles();
  const router = useRouter();
  const { redirect } = router.query;
  const {
    state: { userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password don't match");
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <Layout title="Register">
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Register
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="name"
              inputProps={{ type: 'name' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="email"
              inputProps={{ type: 'email' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="password"
              inputProps={{ type: 'password' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="confirmPassword"
              inputProps={{ type: 'confirmPassword' }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" fullWidth type="submit" color="primary">
              Register
            </Button>
          </ListItem>
          Already have an account?{' '}
          <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
            <Link>Login</Link>
          </NextLink>
        </List>
      </form>
    </Layout>
  );
}
