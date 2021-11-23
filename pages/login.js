import React from 'react';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import useStyles from '../utils/styles';
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from '@material-ui/core';

export default function LoginPage() {
  const classes = useStyles();
  return (
    <Layout title="login" className={classes.form}>
      <form>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="email"
              inputProps={{ type: 'email' }}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="password"
              inputProps={{ type: 'password' }}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" fullWidth type="submit" color="primary">
              Login
            </Button>
          </ListItem>
          Don't have an account?{' '}
          <NextLink href="/register" passHref>
            <Link>Register</Link>
          </NextLink>
        </List>
      </form>
    </Layout>
  );
}
