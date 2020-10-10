import { UserKey } from './userKey';

export interface PageBeanUserKey {
  self: string;
  nextPage: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: UserKey[];
}
