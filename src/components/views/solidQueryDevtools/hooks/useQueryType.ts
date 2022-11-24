import type { Query } from '@tanstack/solid-query';
import { useIsFetching } from '@tanstack/solid-query';
import type { Accessor } from 'solid-js';
import { counts, setCounts } from '~/components/views/solidQueryDevtools/store/counts';

// WARNING: use it only ones
const useQueryType = (query: Accessor<Query>) => {
  const isFetching = useIsFetching({
    queryKey: () => query()?.queryKey,
    exact: true,
  });
  const hash = createMemo(() => query().queryHash);

  const type = createMemo(() => {
    const queryV = query();
    if (!queryV) return undefined;

    if (isFetching()) return 'fetching';
    return queryV.getObserversCount() ? 'active' : 'inactive';
  });

  createEffect(() => {
    setCounts(hash(), type());
  });

  return type;
};

export const getQueryType = (queryHash: Accessor<string>) => (
  createMemo(() => counts[queryHash()])
);

export default useQueryType;
