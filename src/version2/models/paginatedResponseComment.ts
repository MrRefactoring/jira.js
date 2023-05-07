import { Comment } from './comment';

export interface PaginatedResponseComment {
  maxResults?: number;
  results?: Comment[];
  startAt?: number;
  total?: number;
}
