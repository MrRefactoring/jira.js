import { IssueTypeIssueCreateMetadata } from './issueTypeIssueCreateMetadata';

export interface PaginatedResponseIssueTypeIssueCreateMetadata {
  maxResults?: number;
  results?: IssueTypeIssueCreateMetadata[];
  startAt?: number;
  total?: number;
}
