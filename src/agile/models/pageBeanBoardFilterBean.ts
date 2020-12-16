export interface PageBeanBoardFilterBean {
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
