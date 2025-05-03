import type { AssociatedItem } from './associatedItem';
import type { ChangedValue } from './changedValue';

/** An audit record. */
export interface AuditRecord {
  /** The ID of the audit record. */
  id?: number;
  /** The summary of the audit record. */
  summary?: string;
  /** The URL of the computer where the creation of the audit record was initiated. */
  remoteAddress?: string;
  /** The date and time on which the audit record was created. */
  created?: string;
  /**
   * The category of the audit record. For a list of these categories, see the help article [Auditing in Jira
   * applications](https://confluence.atlassian.com/x/noXKM).
   */
  category?: string;
  /** The event the audit record originated from. */
  eventSource?: string;
  /** The description of the audit record. */
  description?: string;
  objectItem?: AssociatedItem;
  /** The list of values changed in the record event. */
  changedValues?: ChangedValue[];
  /** The list of items associated with the changed record. */
  associatedItems?: AssociatedItem[];
}
