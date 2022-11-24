interface FlatSpanProps {
  title: string,
  data: any
}

function FlatLi(props: FlatSpanProps) {
  return (
    <li>
      <span>{props.title}: </span>
      <span class="text-qd-data">{typeof props.data == 'string' ? `"${props.data}"` : props.data}</span>
    </li>
  );
}

export default FlatLi;
