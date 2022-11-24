import type { Query } from '@tanstack/solid-query';
import { useQueryClient } from '@tanstack/solid-query';
import type { Accessor } from 'solid-js';
import getQueryData from '~/components/views/solidQueryDevtools/helpers/getQueryData';

export interface ListPoint {
  query: Accessor<Query>
}

const useQueryList = () => {
  const queryClient = useQueryClient();
  const [list, setList] = createStore<Record<string, ListPoint>>(Object.fromEntries(
    queryClient.getQueryCache().getAll().map((query) => [
      query.queryHash,
      getQueryData(query),
    ]),
  ));

  queryClient.getQueryCache().subscribe(({ query, type: evType }) => {
    if (evType == 'removed') {
      setList(produce((list) => {
        delete list[query.queryHash];
      }));
    } else {
      setList(query.queryHash, getQueryData(query));
    }
  });

  return list;
};

export default useQueryList;
