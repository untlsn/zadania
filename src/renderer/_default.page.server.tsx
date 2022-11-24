import { generateHydrationScript, renderToStream } from 'solid-js/web';
import { escapeInject, dangerouslySkipEscape, stampPipe } from 'vite-plugin-ssr';
import { App } from './App';
import type { PageContext } from './types';
import values from '../../meta';

export const passToClient = ['pageProps', 'documentProps'];

export function render(pageContext: PageContext) {
  const { pipe } = renderToStream(() => <App route={() => pageContext} />);
  stampPipe(pipe, 'node-stream');

  const { documentProps } = pageContext;
  const title = documentProps?.title || values.short_name;
  const description = documentProps?.description || values.description;

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
        <link rel="mask-icon" href="/mask-icon.svg" color="${values.theme_color}">
        <meta name="theme-color" content="${values.theme_color}">
        <link rel="manifest" href="manifest.webmanifest" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
        <title>${title}</title>
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body>
        <div id="page-view">${pipe}</div>
      </body>
    </html>`;
}
