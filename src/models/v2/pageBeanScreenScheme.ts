import { ScreenScheme } from './screenScheme';

export interface PageBeanScreenScheme {
  self: string;
  nextPage: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: ScreenScheme[];
}
