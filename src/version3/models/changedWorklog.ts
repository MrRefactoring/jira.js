import { EntityProperty } from './entityProperty';

/**
 * Details of a changed worklog. */
export interface ChangedWorklog {
  /** The ID of the worklog. */
  worklogId?: number;
  /** The datetime of the change. */
  updatedTime?: number;
  /** Details of properties associated with the change. */
  properties?: EntityProperty[];
}
