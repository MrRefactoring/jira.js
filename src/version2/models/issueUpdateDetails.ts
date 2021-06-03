import { IssueTransition } from './issueTransition';
import { HistoryMetadata } from './historyMetadata';
import { EntityProperty } from './entityProperty';

/** Details of an issue update request. */
export interface IssueUpdateDetails {
  transition?: IssueTransition;
  /**
   * List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field
   * provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are
   * required, use `update`. Fields included in here cannot be included in `update`.
   */
  fields?: any;
  /** List of operations to perform on issue screen fields. Note that fields included in here cannot be included in `fields`. */
  update?: any;
  historyMetadata?: HistoryMetadata;
  /** Details of issue properties to be add or update. */
  properties?: EntityProperty[];
}
