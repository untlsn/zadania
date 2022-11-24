const mergeDefaultProps = <T>(props: T, defaultProps: Partial<T>) => (
  mergeProps(defaultProps, props) as T
);

export default mergeDefaultProps;
