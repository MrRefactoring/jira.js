import { IssueFieldOptionConfiguration } from './issueFieldOptionConfiguration';

export interface IssueFieldOption {
  id: number;
  value: string;
  properties?: {
    [key: string]: unknown;
  };
  config?: IssueFieldOptionConfiguration[];
}
