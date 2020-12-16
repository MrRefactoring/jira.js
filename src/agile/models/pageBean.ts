export interface PageBean {
  maxResults?: number;
  startAt?: number;
  total?: number;
  isLast?: boolean;
  values?: Record<string, any>[];
}
