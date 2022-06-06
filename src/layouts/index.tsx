import React, { FC, Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

type LayoutProps = {
    children: React.ReactNode;
};
const Layout: FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const [hideOther, setHideOther] = useState(false); // 隐藏头部底部

    useEffect(() => {
        setHideOther(router.pathname.includes("/login"));
        console.log("router.pathname", router.pathname);
    }, [router.pathname]);
    if (!router.isReady) {
        return null;
    }
    return (
        <Fragment>
            {!hideOther ? <Header /> : null}
            <div className="bg-white text-grey-53 font-sans text-16 leading-normal antialiased box-border">
                {children}
            </div>
            {!hideOther ? <Footer /> : null}
        </Fragment>
    );
};

export default Layout;
