import type { Query } from '@tanstack/solid-query';
import { setSelected } from '~/components/views/solidQueryDevtools/signals/selected';
import colors from '~/components/views/solidQueryDevtools/data/colors';
import useQueryType from '~/components/views/solidQueryDevtools/hooks/useQueryType';

interface QueryListPointProps {
  isSelected(key: string): boolean
  query: Query
}

function QueryListPoint(props: QueryListPointProps) {
  const query = () => props.query;
  const type = useQueryType(() => query());
  const hash = createMemo(() => query().queryHash);
  const isSelected = () => props.isSelected(hash());

  return (
    <li
      class={clsx(
        'border-(b-1 qd-secondary) flex items-stretch cursor-pointer',
        isSelected() && 'bg-white/10',
      )}
      onClick={() => (isSelected() ? setSelected('') : setSelected(hash()))}
    >
      <p class={clsx('size-8 text-center pt-1', colors[type()])}>
        {query().getObserversCount()}
      </p>
      <p class={clsx('p-(x2 t1)', isSelected() && 'bg-white/10')}>{hash()}</p>
    </li>
  );
}

export default QueryListPoint;
