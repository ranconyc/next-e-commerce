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

export default function LoginPage() {
  const classes = useStyles();
  const router = useRouter();
  const { redirect } = router.query; // login?redirect
  const {
    state: { userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
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
    <Layout title="login">
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
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
              label="Password"
              inputProps={{ type: 'password' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" fullWidth type="submit" color="primary">
              Login
            </Button>
          </ListItem>
          {"Don't have an account? "}
          <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
            <Link>Register</Link>
          </NextLink>
        </List>
      </form>
    </Layout>
  );
}
