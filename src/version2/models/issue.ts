import { Fields } from './fields';
import { IncludedFields } from './includedFields';
import { IssueTransition } from './issueTransition';
import { IssueUpdateMetadata } from './issueUpdateMetadata';
import { Operations } from './operations';
import { PageOfChangelogs } from './pageOfChangelogs';

/** @deprecated Use Issue instead. */
export type IssueBean = Issue;

/** Details about an issue. */
export interface Issue {
  /** Expand options that include additional issue details in the response. */
  expand?: string;
  /** The ID of the issue. */
  id: string;
  /** The URL of the issue details. */
  self?: string;
  /** The key of the issue. */
  key: string;
  /** The rendered value of each field present on the issue. */
  renderedFields?: Fields;
  /** Details of the issue properties identified in the request. */
  properties?: {};
  /** The ID and name of each field present on the issue. */
  names?: Record<string, string>;
  /** The schema describing each field present on the issue. */
  schema?: {};
  /** The transitions that can be performed on the issue. */
  transitions?: IssueTransition[];
  operations?: Operations;
  editmeta?: IssueUpdateMetadata;
  changelog?: PageOfChangelogs;
  /** The versions of each field on the issue. */
  versionedRepresentations?: {};
  fieldsToInclude?: IncludedFields;
  fields: Fields;
}
