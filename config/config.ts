import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
  dva: {
    immer: true,
    hmr: true,
    // skipModelValidate: true,
  },
  tailwindcss: {
    tailwindConfigFilePath: 'tailwind-custom.config.js', // 默认取值 tailwindConfigFilePath || join(process.env.APP_ROOT || api.cwd, 'tailwind.config.js'),,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
