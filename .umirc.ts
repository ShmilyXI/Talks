export default {
  npmClient: "pnpm",
  title: "Talks",
  alias: {
    "@": "/src",
    "@components": "/src/components",
    "@styles": "/src/styles",
  },
  extraPostCSSPlugins: [require("tailwindcss")],
  proxy: {
    "/api": {
      target: "http://127.0.0.1:3000",
      pathRewrite: {
        "^/api": "/",
      },
      changeOrigin: true,
    },
  },
};
