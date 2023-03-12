import { IApi } from 'umi';

export default (api: IApi) => {
  api.addHTMLScripts(() => ({
    src: '//at.alicdn.com/t/c/font_3238669_4srkmhn5erw.js',
    type: 'text/javascript',
  }));
};
