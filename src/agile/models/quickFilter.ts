/** @deprecated Use QuickFilter instead. */
export type QuickFilterBean = QuickFilter;

export interface QuickFilter {
  id?: number;
  boardId?: number;
  name?: string;
  jql?: string;
  description?: string;
  position?: number;
}
