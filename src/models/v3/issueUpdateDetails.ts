import { EntityProperty } from './entityProperty';
import { HistoryMetadata } from './historyMetadata';
import { IssueTransition } from './issueTransition';

export interface IssueUpdateDetails {
  transition: IssueTransition[];
  fields: {
    [key: string]: unknown;
  };
  update: {
    [key: string]: unknown;
  };
  historyMetadata: HistoryMetadata[];
  properties: EntityProperty[];
  [key: string]: unknown;
}
