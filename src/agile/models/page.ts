/** @deprecated Use Page instead. */
export type PageBean = Page;

export interface Page {
  maxResults?: number;
  startAt?: number;
  total?: number;
  isLast?: boolean;
  values?: any[];
}
