import React from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import store from "@redux/store";
import Layouts from "@/layouts";
import { Toaster } from "react-hot-toast";
import "@/utils/i18n";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjsLocalZh from "dayjs/locale/zh-cn";

import dayjs from "dayjs";

import "tailwindcss/tailwind.css";
import "@styles/default.css";
import "@styles/global.less";
import "yet-another-react-lightbox/styles.css";

dayjs.extend(relativeTime); // dayjs 相对时间插件
dayjs.locale(dayjsLocalZh); // dayjs 国际化

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    <Layouts>
                        <Component {...pageProps} />
                        <Toaster />
                    </Layouts>
                </Provider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
