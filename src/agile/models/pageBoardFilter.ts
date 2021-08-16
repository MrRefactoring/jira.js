/** @deprecated Use PageBoardFilter instead. */
export type PageBeanBoardFilterBean = PageBoardFilter;

export interface PageBoardFilter {
  maxResults?: number;
  startAt?: number;
  total?: number;
  isLast?: boolean;
  values?: {
    id?: number;
    self?: string;
    name?: string;
  }[];
}
