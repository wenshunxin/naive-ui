import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
  },
  server: {
    // cors: true,
    open: true,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:5173", //"http://221.217.229.158:18108/mynfthree",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "@primary-color": "#ae3e17", // 全局主色 #1890FF  #2f54eb
        },
        javascriptEnabled: true,
      },
    },
  },
});
