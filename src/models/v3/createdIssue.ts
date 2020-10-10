import { NestedResponse } from './nestedResponse';

export interface CreatedIssue {
  id: string;
  key: string;
  self: string;
  transition: NestedResponse[];
}
