import type { Query } from '@tanstack/solid-query';
import type { ListPoint } from '~/components/views/solidQueryDevtools/hooks/useQueryList';

const getQueryData = (query: Query): ListPoint => ({
  query: () => query,
});

export default getQueryData;
