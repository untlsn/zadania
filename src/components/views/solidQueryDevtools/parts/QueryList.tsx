import type { ListPoint } from '~/components/views/solidQueryDevtools/hooks/useQueryList';
import useQueryList from '~/components/views/solidQueryDevtools/hooks/useQueryList';
import { selected } from '~/components/views/solidQueryDevtools/signals/selected';
import QueryListPoint from '~/components/views/solidQueryDevtools/parts/QueryListPoint';

interface QueryListProps {
  setSelectedPoint(point: ListPoint | undefined): void
}

function QueryList(props: QueryListProps) {
  const list = useQueryList();
  const isSelected = createSelector(selected);

  createEffect(() => {
    if (selected()) {
      props.setSelectedPoint(list[selected()]);
    } else {
      props.setSelectedPoint(undefined);
    }
  });

  return (
    <ul class="bg-qd-primary py-2 flex-1">
      <For each={Object.values(list)}>
        {(data) => <QueryListPoint query={data.query()} isSelected={isSelected} />}
      </For>
    </ul>
  );
}

export default QueryList;
