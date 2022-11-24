export function Page(pageProps) {
  return (
    <Show when={pageProps.is404} fallback={<div>404</div>}>
      <div>Server Down</div>
    </Show>
  );
}
