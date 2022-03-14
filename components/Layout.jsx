import React from 'react';
import Header from './Header';
import AppBar from './AppBar';

const Layout = ({ children }) => (
  <>
    <AppBar />
    {/* <Header /> */}
    {children}
  </>
);

export default Layout;
