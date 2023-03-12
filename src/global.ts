

import React, { Component, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import Layouts from '@/layouts';
import { Toaster } from 'react-hot-toast';
import '@/utils/i18n';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjsLocalZh from 'dayjs/locale/zh-cn';
import tippy from 'tippy.js';

import dayjs from 'dayjs';

import 'tailwindcss/tailwind.css';
import '@styles/default.css';
import '@styles/global.less';
import 'yet-another-react-lightbox/styles.css';
import 'tippy.js/dist/tippy.css';

// import '//at.alicdn.com/t/c/font_3238669_ksto67wypd.js';
import './assets/hs-ui.bundle.js';

dayjs.extend(relativeTime); // dayjs 相对时间插件
dayjs.locale(dayjsLocalZh); // dayjs 国际化
