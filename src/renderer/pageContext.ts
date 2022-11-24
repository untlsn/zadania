import type { PageContext } from '~/renderer/types';

export const PageCtx = createContext<PageContext>();
export const usePageContext = () => useContext(PageCtx);
