import React, { FC, Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [hideHeader, setHideHeader] = useState(false); // 隐藏头部
  const [hideFooter, setHideFooter] = useState(false); // 隐藏底部

  useEffect(() => {
    const loginFlag = !!router.asPath.includes("/login");
    const detailFlag = !!router.asPath.includes("/photoDetail");
    setHideHeader(loginFlag);
    setHideFooter(loginFlag || detailFlag);
  }, [router.pathname]);

  return (
    <div className="overflow-hidden h-screen">
      {!hideHeader ? <Header /> : null}
      <div className="h-full overflow-auto bg-white text-grey-53 font-sans text-16 leading-normal antialiased box-border">
        {children}
        {!hideFooter ? <Footer /> : null}
      </div>
    </div>
  );
};

export default Layout;
