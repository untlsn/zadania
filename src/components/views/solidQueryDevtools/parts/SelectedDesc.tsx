import dayjs from 'dayjs';
import type { Query } from '@tanstack/solid-query';
import { useQueryClient } from '@tanstack/solid-query';
import DetailsBar from '~/components/views/solidQueryDevtools/parts/DetailsBar';
import FlatLi from '~/components/views/solidQueryDevtools/parts/FlatLi';
import colors from '~/components/views/solidQueryDevtools/data/colors';
import { getQueryType } from '~/components/views/solidQueryDevtools/hooks/useQueryType';

interface ButtonProps {
  class: string
  children: any
  onClick?(): void
}

function Button(props: ButtonProps) {
  const onClick = () => props.onClick();

  return (
    <li>
      <button type="button" class={clsx('rounded p-(x2 y1)', props.class)} onClick={onClick}>
        {props.children}
      </button>
    </li>
  );
}

interface SelectedDescProps {
  query: Query
  onRemove(): void
}

type QueryFnName = 'refetch' | 'invalidate' | 'reset' | 'remove'

function SelectedDesc(props: SelectedDescProps) {
  const queryClient = useQueryClient();
  const data = () => props.query.state.data;
  const hash = createMemo(() => props.query.queryHash);
  const type = getQueryType(hash);

  const useOnQuery = (key: QueryFnName) => (
    queryClient[`${key}Queries` as any](props.query.queryKey, { exact: true })
  );

  return (
    <div class="space-y-1 py-2 border-(l-1 qd-secondary) overflow-y-scroll fancy-scroll">
      <p class="px-2">Query details</p>
      <ul class="bg-qd-primary p-(y4 x2) text-sm">
        <li class="flex justify-between">
          <span>{hash()}</span>
          <span class={clsx(
            colors[type()],
            'rounded p-(x2 y1) h-full',
          )}
          >
            {type()}
          </span>
        </li>
        <li class="flex justify-between">
          <span>Observers:</span>
          <span>{props.query.getObserversCount()}</span>
        </li>
        <li class="flex justify-between">
          <span>Last updated:</span>
          <span>{dayjs(props.query.state.dataUpdatedAt).format('HH:mm:ss')}</span>
        </li>
      </ul>
      <p class="px-2">Actions</p>
      <ul class="bg-qd-primary flex gap-2 p-2">
        <Button
          onClick={() => useOnQuery('refetch')}
          class="bg-qd-fetching"
        >
          Refetch
        </Button>
        <Button
          onClick={() => useOnQuery('invalidate')}
          class="bg-qd-active text-black"
        >
          Invalidate
        </Button>
        <Button
          onClick={() => useOnQuery('refetch')}
          class="bg-qd-inactive"
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            useOnQuery('remove');
            props.onRemove();
          }}
          class="bg-qd-data"
        >
          Remove
        </Button>
      </ul>
      <p class="px-2">Data explorer</p>
      <ul class="bg-qd-primary px-2">
        {typeof data() == 'object'
          ? <DetailsBar title="Data" data={data()} defaultOpen />
          : <FlatLi title="Data" data={data()} />}
      </ul>
      <p class="px-2">Query explorer</p>
      <ul class="bg-qd-primary px-2">
        <DetailsBar title="Query" data={props.query} defaultOpen />
      </ul>
    </div>
  );
}

export default SelectedDesc;
