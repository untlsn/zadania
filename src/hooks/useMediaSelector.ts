const useMediaSelector = (query: string) => {
  const [mediaSignal, setMediaSignal] = createSignal(false);
  if (!import.meta.env.SSR) {
    const setMedia = ({ matches }: { matches: boolean }) => setMediaSignal(matches);
    const mediaQuery = window.matchMedia(query);

    onMount(() => setMedia(mediaQuery));
    mediaQuery.addEventListener('change', setMedia);
  }

  return mediaSignal;
};

export default useMediaSelector;
