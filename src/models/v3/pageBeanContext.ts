import { Context } from './context';

export interface PageBeanContext {
  self: string;
  nextPage: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: Context[];
}
