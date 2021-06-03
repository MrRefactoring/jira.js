import { Fields } from './fields';

/** The ID or key of a linked issue. */
export interface LinkedIssue {
  /** The ID of an issue. Required if `key` isn't provided. */
  id?: string;
  /** The key of an issue. Required if `id` isn't provided. */
  key?: string;
  /** The URL of the issue. */
  self?: string;
  fields?: Fields;
}
