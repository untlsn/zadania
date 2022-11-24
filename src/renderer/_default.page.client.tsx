import { createSignal } from 'solid-js';
import { hydrate } from 'solid-js/web';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router';
import { App } from './App';
import type { PageContext } from './types';
import '$css';

import('virtual:pwa-register').then(({ registerSW }) => registerSW());
let afterHydrate = false;
export const clientRouting = true;

// Central signal to track the current active route.
const [route, setRoute] = createSignal<PageContext>(null);

export function render(pageContext: PageContextBuiltInClient & PageContext) {
  const content = document.getElementById('page-view');
  setRoute(pageContext);

  if (!afterHydrate) {
    hydrate(() => <App route={route} />, content!);
    afterHydrate = true;
  }
}
