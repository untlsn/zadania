import FlatLi from '~/components/views/solidQueryDevtools/parts/FlatLi';

interface DetailsBarProps {
  title: any
  data: Record<any, any>
  defaultOpen?: boolean
}

function DetailsBar(props: DetailsBarProps) {
  const [open, setOpen] = createSignal(!!props.defaultOpen);

  const length = () => Object.keys(props.data).length;

  return (
    <li>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        <i class={clsx('i-ic-baseline-play-arrow transition-transform', open() ? 'rotate-90' : '')}>arrow</i>
        <span> {props.title} </span>
        <Show when={length()}>
          <span class="text-gray-500 text-10px">{length} items</span>
        </Show>
      </button>
      <Show when={open()}>
        <ul class="pl-4">
          <For each={Object.entries(props.data)}>
            {([key, val]) => (
              typeof val == 'object'
                ? <DetailsBar title={key} data={val} />
                : <FlatLi title={key} data={val} />
            )}
          </For>
        </ul>
      </Show>
    </li>
  );
}

export default DetailsBar;
