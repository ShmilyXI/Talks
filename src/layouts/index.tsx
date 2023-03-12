import React, { FC, Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "umi";
import { Outlet } from "umi";
import toast, { Toaster } from "react-hot-toast";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout: FC<LayoutProps> = ({ children }) => {
  const routeLocation = useLocation();

  const [hideHeader, setHideHeader] = useState(false); // 隐藏头部
  const [hideFooter, setHideFooter] = useState(false); // 隐藏底部
  
  useEffect(() => {
    const loginFlag = !!routeLocation.pathname.includes("/login");
    const detailFlag = !!routeLocation.pathname.includes("/photoDetail");
    setHideHeader(loginFlag);
    setHideFooter(loginFlag || detailFlag);
  }, [routeLocation.pathname]);

  return (
    <div className="overflow-hidden">
      <Toaster />
      {!hideHeader ? <Header /> : null}
      <div className={`bg-white text-grey-53 font-sans text-16 leading-normal antialiased box-border ${!hideHeader ? "mt-[80px]" : ""}`} style={{
      }}>
        <Outlet />
        {!hideFooter ? <Footer /> : null}
      </div>
    </div>
  );
};

export default Layout;
