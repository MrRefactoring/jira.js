import type { Document } from './document.js';
import type { EntityProperty } from './entityProperty.js';
import type { Fields } from './fields.js';
import type { HistoryMetadata } from './historyMetadata.js';
import type { IssueTransition } from './issueTransition.js';

/** Details of an issue update request. */
export interface IssueUpdateDetails {
  transition?: IssueTransition;
  /**
   * List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field
   * provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are
   * required, use `update`. Fields included in here cannot be included in `update`.
   */
  fields?: Partial<Omit<Fields, 'description'> & { description: string | Document }> | any;
  /**
   * A Map containing the field field name and a list of operations to perform on the issue screen field. Note that
   * fields included in here cannot be included in `fields`.
   */
  update?: {};
  historyMetadata?: HistoryMetadata;
  /** Details of issue properties to be add or update. */
  properties?: EntityProperty[];
}
