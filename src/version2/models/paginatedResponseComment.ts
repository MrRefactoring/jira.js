import { Comment } from './comment';

export interface PaginatedResponseComment {
  total?: number;
  startAt?: number;
  maxResults?: number;
  results?: Comment[];
}
