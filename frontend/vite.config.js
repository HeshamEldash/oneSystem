import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import jsconfigPaths from "vite-jsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    host:true,
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

    VitePWA(
      { 
        registerType: 'autoUpdate',

        devOptions: {
          enabled: true,

        },

        injectRegister: 'auto',

        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching:[
            {
              urlPattern:({url})=>{
                  return url.pathname.startsWith("/app-api")
              },
              handler:"StaleWhileRevalidate",
              options:{
                cacheName:"api-cache",
                cacheableResponse:{
                  statuses:[0, 200]
                }
              }
              
            },
          ],

        },

        strategies:"generateSW",




        // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        // manifest: {
        //   name: 'My Awesome App',
        //   short_name: 'MyApp',
        //   description: 'My Awesome App description',
        //   theme_color: '#ffffff',
        //   icons: [
        //     {
        //       src: 'pwa-192x192.png',
        //       sizes: '192x192',
        //       type: 'image/png'
        //     },
        //     {
        //       src: 'pwa-512x512.png',
        //       sizes: '512x512',
        //       type: 'image/png'
        //     }
        //   ]
        // }


      },

      ),

    svgrPlugin(),
    jsconfigPaths(),
    tsconfigPaths(),
  ],
});
