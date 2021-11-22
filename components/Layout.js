import React, { useState } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Container, Typography } from '@material-ui/core';

export default function Layout({ children, ...props }) {
  const [appName, setAppName] = useState('Next e-commerce');
  return (
    <div>
      <Head>
        <title>{appName}</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>{appName}</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>
        <Typography>All rights reserved {appName}</Typography>
      </footer>
    </div>
  );
}
