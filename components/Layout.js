import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Link,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import Head from 'next/head';
import NextLink from 'next/link';
import useStyles from '../utils/styles';

export default function Layout({ children, description, title, ...props }) {
  const [appName, setAppName] = useState('Rancommerce');
  const classes = useStyles();
  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: '400',
        margin: ' 1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: '400',
        margin: ' 1rem 0',
      },
    },
    palette: {
      type: 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  return (
    <div>
      <Head>
        <title>{title ? `${title} - ${appName}` : `${appName}`}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>{appName}</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <NextLink href="/cart" passHref>
              <Link>cart</Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>login</Link>
            </NextLink>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved {appName}</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
