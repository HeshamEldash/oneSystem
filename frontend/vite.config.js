import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import jsconfigPaths from "vite-jsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    outDir: "build",
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },

  plugins: [
    react({
      include: "**/*.{jsx,tsx}",
      babel: {
        plugins: ["babel-plugin-styled-components"],
      },
      jsxRuntime: "classic",
    }),

    svgrPlugin(),
    jsconfigPaths(),
    tsconfigPaths(),
  ],
});
