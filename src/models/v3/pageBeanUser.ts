import { User } from './user';

export interface PageBeanUser {
  self: string;
  nextPage: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: User[];
}
