import { IssueTypeScreenSchemesProjects } from './issueTypeScreenSchemesProjects';

export interface PageBeanIssueTypeScreenSchemesProjects {
  self: string;
  nextPage: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: IssueTypeScreenSchemesProjects[];
}
