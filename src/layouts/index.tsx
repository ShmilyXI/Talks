import React, { FC, Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};
const Layout: FC<LayoutProps> = ({ children }) => (
  <Fragment>
    <Header />
    <div className="bg-white text-grey-53 font-sans text-16 leading-normal antialiased box-border">
      {children}
    </div>
    <Footer />
  </Fragment>
);

export default Layout;
