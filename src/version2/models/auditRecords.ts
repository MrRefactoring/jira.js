import { AuditRecordBean } from './auditRecordBean';

/** Container for a list of audit records. */
export interface AuditRecords {
  /** The number of audit items skipped before the first item in this list. */
  offset?: number;
  /** The requested or default limit on the number of audit items to be returned. */
  limit?: number;
  /** The total number of audit items returned. */
  total?: number;
  /** The list of audit items. */
  records?: AuditRecordBean[];
}
