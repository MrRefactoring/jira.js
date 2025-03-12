import type { JsonType } from './jsonType';
import type { Scope } from './scope';

/** Details about a field. */
export interface FieldDetails {
  /**
   * The names that can be used to reference the field in an advanced search. For more information, see [Advanced
   * searching - fields reference](https://confluence.atlassian.com/x/gwORLQ).
   */
  clauseNames?: string[];
  /** Whether the field is a custom field. */
  custom?: boolean;
  /** The ID of the field. */
  id?: string;
  /** The key of the field. */
  key?: string;
  /** The name of the field. */
  name?: string;
  /** Whether the field can be used as a column on the issue navigator. */
  navigable?: boolean;
  /** Whether the content of the field can be used to order lists. */
  orderable?: boolean;
  schema?: JsonType;
  scope?: Scope;
  /** Whether the content of the field can be searched. */
  searchable?: boolean;
}
