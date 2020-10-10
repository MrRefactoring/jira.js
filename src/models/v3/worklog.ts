import { EntityProperty } from './entityProperty';
import { UserDetails } from './userDetails';
import { Visibility } from './visibility';

export interface Worklog {
  self: string;
  author: UserDetails[];
  updateAuthor: UserDetails[];
  comment: unknown;
  created: string;
  updated: string;
  visibility: Visibility[];
  started: string;
  timeSpent: string;
  timeSpentSeconds: number;
  id: string;
  issueId: string;
  properties: EntityProperty[];
  [key: string]: unknown;
}
