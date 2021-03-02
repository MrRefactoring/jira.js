import { Comment } from './comment';

export interface PaginatedResponseComment {
  total?: number;
  results?: Comment[];
  maxResults?: number;
  startAt?: number;
}
