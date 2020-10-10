import { IncludedFields } from './includedFields';
import { IssueTransition } from './issueTransition';
import { IssueUpdateMetadata } from './issueUpdateMetadata';
import { Operations } from './operations';
import { PageOfChangelogs } from './pageOfChangelogs';

export interface IssueBean {
  expand: string;
  id: string;
  self: string;
  key: string;
  renderedFields: {
    [key: string]: unknown;
  };
  properties: {
    [key: string]: unknown;
  };
  names: {
    [key: string]: unknown;
  };
  schema: {
    [key: string]: unknown;
  };
  transitions: IssueTransition[];
  operations: Operations[];
  editmeta: IssueUpdateMetadata[];
  changelog: PageOfChangelogs[];
  versionedRepresentations: {
    [key: string]: unknown;
  };
  fieldsToInclude: IncludedFields[];
  fields: {
    [key: string]: unknown;
  };
}
