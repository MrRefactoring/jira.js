import { Fields } from './fields.mjs';
import { IncludedFields } from './includedFields.mjs';
import type { IssueTransition } from './issueTransition.mjs';
import { IssueUpdateMetadata } from './issueUpdateMetadata.mjs';
import { Operations } from './operations.mjs';
import { PageOfChangelogs } from './pageOfChangelogs.mjs';

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
  renderedFields?: {};
  /** Details of the issue properties identified in the request. */
  properties?: {};
  /** The ID and name of each field present on the issue. */
  names?: {};
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
