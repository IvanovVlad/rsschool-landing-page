import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/rsschool-landing-page",
  build: {
    sourcemap: true,
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        menu: resolve(__dirname, "menu.html"),
      },
    },
  },
});
