import { Comment } from './comment';

export interface PaginatedResponseComment {
  total?: number;
  maxResults?: number;
  startAt?: number;
  results?: Comment[];
}
