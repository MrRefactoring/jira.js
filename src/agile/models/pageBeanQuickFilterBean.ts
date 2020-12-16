export interface PageBeanQuickFilterBean {
  maxResults?: number;
  startAt?: number;
  total?: number;
  isLast?: boolean;
  values?: {
    id?: number;
    boardId?: number;
    name?: string;
    jql?: string;
    description?: string;
    position?: number;
  }[];
}
