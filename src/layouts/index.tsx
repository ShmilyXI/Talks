import React, { FC, Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};
const Layout: FC<LayoutProps> = ({ children }) => (
  <Fragment>
    <Header />
    <div>{children}</div>
    <Footer />
  </Fragment>
);

export default Layout;
