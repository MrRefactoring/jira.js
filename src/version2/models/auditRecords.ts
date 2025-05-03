import type { AuditRecord } from './auditRecord';

/** Container for a list of audit records. */
export interface AuditRecords {
  /** The requested or default limit on the number of audit items to be returned. */
  limit?: number;
  /** The number of audit items skipped before the first item in this list. */
  offset?: number;
  /** The list of audit items. */
  records?: AuditRecord[];
  /** The total number of audit items returned. */
  total?: number;
}
