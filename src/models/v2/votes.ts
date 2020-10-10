import { User } from './user';

export interface Votes {
  self: string;
  votes: number;
  hasVoted: boolean;
  voters: User[];
}
