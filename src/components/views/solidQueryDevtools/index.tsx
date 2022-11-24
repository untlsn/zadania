import type { SolidQueryDevtoolsProps } from '~/components/views/solidQueryDevtools/component';

const SolidQueryDevtoolsComponent = lazy(() => import('./component'));

function SolidQueryDevtools(props: SolidQueryDevtoolsProps) {
  return (
    <Show when={import.meta.env.DEV}>
      <Suspense fallback="">
        <SolidQueryDevtoolsComponent {...props} />
      </Suspense>
    </Show>
  );
}

export default SolidQueryDevtools;
