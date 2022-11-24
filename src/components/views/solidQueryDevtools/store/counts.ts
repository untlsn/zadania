import type { Type } from '~/components/views/solidQueryDevtools/data/types';

const [counts, setCounts] = createStore<Record<string, Type>>({});

export const countType = (type: Type) => (
  Object.values(counts).reduce(
    (acc, cur) => acc + Number(cur == type),
    0,
  )
);

export { counts, setCounts };
