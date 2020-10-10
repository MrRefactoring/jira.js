import { IssueTypeScreenSchemeMapping } from './issueTypeScreenSchemeMapping';

export interface IssueTypeScreenSchemeDetails {
  name: string;
  description?: string;
  issueTypeMappings: IssueTypeScreenSchemeMapping[];
}
