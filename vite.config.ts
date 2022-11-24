import solid from 'vite-plugin-solid';
import { defineConfig } from 'vite';
import css from 'unocss/vite';
import autoImport from 'unplugin-auto-import/vite';
import path from 'path';
import ssr from 'vite-plugin-ssr/plugin';
import inspect from 'vite-plugin-inspect';
import { VitePWA } from 'vite-plugin-pwa';
import values from './meta';

export default defineConfig({
  server: {
    port: 3333,
  },
  build: {
    polyfillModulePreload: false,
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, '/src/'),
      $css: path.join(__dirname, '/src/assets/style/index.ts'),
    },
  },
  plugins: [
    inspect(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        ...values,
        icons: ['72', '96', '128', '144', '152', '192', '384', '512'].map((size) => {
          const sizes = `${size}x${size}`;

          return {
            src: `icons/icon-${sizes}.png`,
            sizes,
            type: 'image/png',
            purpose: 'maskable any',
          };
        }),
      },
    }),
    ssr({ prerender: true }),
    solid({ ssr: true }),
    css(),
    autoImport({
      dts: 'src/auto-imports.d.ts',
      imports: [
        'solid-js',
        {
          '@tanstack/solid-query': ['createQuery', 'createInfiniteQuery', 'useQueryClient'],
          clsx: ['clsx'],
          '@solidjs/router': ['Link', 'NavLink', 'Navigate', 'Outlet', 'Route', 'Router', 'Routes', '_mergeSearchString', 'createIntegration', 'hashIntegration', 'normalizeIntegration', 'pathIntegration', 'staticIntegration', 'useHref', 'useIsRouting', 'useLocation', 'useMatch', 'useNavigate', 'useParams', 'useResolvedPath', 'useRouteData', 'useRoutes', 'useSearchParams'],
        },
      ],
    }),
  ],
});
