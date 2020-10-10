import { IssueFieldOption } from './issueFieldOption';

export interface PageBeanIssueFieldOption {
  self: string;
  nextPage: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: IssueFieldOption[];
}
