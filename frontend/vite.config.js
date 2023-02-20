import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import jsconfigPaths from "vite-jsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    host: true,
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

    VitePWA({
      registerType: "autoUpdate",

      // devOptions: {
      //   enabled: false,

      // },

      injectRegister: "auto",

      workbox: {
        globPatterns: ["**/*.{js,jsx,css,html,ico,png,svg}"],
        maximumFileSizeToCacheInBytes: 100000000,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/app-api");
            },
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      strategies: "generateSW",

      // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: "DocNect",
        short_name: "DocNect",
        description: "Connecting Patients and Doctors",
        scope: "/",
        start_url: "app/staff-dashboard",
        display: "standalone",
        theme_color: "#431666",
        background_color: "#ffffff",

        icons: [
          {
            src: "icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),

    svgrPlugin(),
    jsconfigPaths(),
    tsconfigPaths(),
  ],
});
