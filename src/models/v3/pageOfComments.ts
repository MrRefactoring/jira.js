import { Comment } from './comment';

export interface PageOfComments {
  startAt: number;
  maxResults: number;
  total: number;
  comments: Comment[];
  [key: string]: unknown;
}
