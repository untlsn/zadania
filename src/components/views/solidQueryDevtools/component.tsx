import icon from './react-query-icon.svg';
import mergeDefaultProps from '~/helpers/mergeDefaultProps';
import SelectedDesc from '~/components/views/solidQueryDevtools/parts/SelectedDesc';
import QueryList from '~/components/views/solidQueryDevtools/parts/QueryList';
import CountList from '~/components/views/solidQueryDevtools/parts/CountList';
import type { ListPoint } from '~/components/views/solidQueryDevtools/hooks/useQueryList';

type ButtonPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface SolidQueryDevtoolsProps {
  defaultOpen?: boolean
  buttonPosition?: ButtonPosition
}

const positionToClasses: Record<ButtonPosition, string> = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
};

function IconImg() {
  return (
    <img
      src={icon}
      alt="query devtools icon"
      class="h-12"
    />
  );
}

function SolidQueryDevtoolsComponent(_props: SolidQueryDevtoolsProps) {
  const props = mergeDefaultProps(_props, { buttonPosition: 'bottom-left', defaultOpen: false });
  const [devtoolsOpen, setDevtoolsOpen] = createSignal(props.defaultOpen);
  const [selectedPoint, setSelectedPoint] = createSignal<ListPoint | undefined>(undefined);

  return (
    <Show
      when={devtoolsOpen()}
      fallback={(
        <button
          type="button"
          onClick={[setDevtoolsOpen, true]}
          class={clsx('m-4 fixed', positionToClasses[props.buttonPosition])}
        >
          <IconImg />
        </button>
      )}
    >
      <aside class="fixed bottom-0 left-0 w-full h-50vh bg-qd-secondary font-mono flex children:flex-1 items-stretch text-white">
        <div class="flex-(~ col)">
          <div class="p-4 flex justify-between">
            <button type="button" onClick={[setDevtoolsOpen, false]}>
              <IconImg />
            </button>
            <CountList />
          </div>
          <QueryList setSelectedPoint={setSelectedPoint} />
        </div>
        <Show when={selectedPoint()?.query()}>
          <SelectedDesc query={selectedPoint().query()} onRemove={() => setSelectedPoint(undefined)} />
        </Show>
      </aside>
    </Show>
  );
}

export default SolidQueryDevtoolsComponent;
