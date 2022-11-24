import colors from '~/components/views/solidQueryDevtools/data/colors';
import type { Type } from '~/components/views/solidQueryDevtools/data/types';
import { types } from '~/components/views/solidQueryDevtools/data/types';
import { countType } from '~/components/views/solidQueryDevtools/store/counts';

interface SelfLiProps {
  typeKey: Type
}

function SelfLi(props: SelfLiProps) {
  return (
    <li class={clsx('p-(x2 y1) rounded capitalize', colors[props.typeKey])}>
      {props.typeKey} ({countType(props.typeKey)})
    </li>
  );
}

function CountList() {
  return (
    <ul class="flex gap-2 text-xs items-start">
      <For each={types}>
        {(type) => <SelfLi typeKey={type} />}
      </For>
    </ul>
  );
}

export default CountList;
