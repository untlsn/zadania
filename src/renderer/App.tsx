import type { Accessor } from 'solid-js';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import type { PageContext } from '~/renderer/types';
import { PageCtx } from '~/renderer/pageContext';
import SolidQueryDevtools from '~/components/views/solidQueryDevtools';

interface Props {
  route: Accessor<PageContext>
}

export function App(props: Props) {
  const queryClient = new QueryClient();
  function render() {
    const Page = props.route()?.Page;
    return <Page />;
  }

  return (
    <Show when={props.route()?.Page}>
      <QueryClientProvider client={queryClient}>
        <PageCtx.Provider value={props.route()}>
          {render}
        </PageCtx.Provider>
        <SolidQueryDevtools />
      </QueryClientProvider>
    </Show>
  );
}
