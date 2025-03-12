import type { EntityProperty } from './entityProperty';

/** Details of a changed worklog. */
export interface ChangedWorklog {
  /** Details of properties associated with the change. */
  properties?: EntityProperty[];
  /** The datetime of the change. */
  updatedTime?: number;
  /** The ID of the worklog. */
  worklogId?: number;
}
