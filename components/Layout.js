import React, { useState } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Container, Typography } from '@material-ui/core';
import useStyles from '../utils/styles';

export default function Layout({ children, ...props }) {
  const [appName, setAppName] = useState('Next e-commerce');
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{appName}</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>{appName}</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved {appName}</Typography>
      </footer>
    </div>
  );
}
