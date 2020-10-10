import { Changelog } from './changelog';

export interface PageBeanChangelog {
  self: string;
  nextPage: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: Changelog[];
}
