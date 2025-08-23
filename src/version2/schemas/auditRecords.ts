import { z } from 'zod';
import { AuditRecordBeanSchema } from './auditRecordBean';

/** Container for a list of audit records. */
export const AuditRecordsSchema = z.object({
  /** The requested or default limit on the number of audit items to be returned. */
  limit: z.number().int().optional(),
  /** The number of audit items skipped before the first item in this list. */
  offset: z.number().int().optional(),
  /** The list of audit items. */
  records: z.array(AuditRecordBeanSchema).optional(),
  /** The total number of audit items returned. */
  total: z.number().int().optional(),
});

export type AuditRecords = z.infer<typeof AuditRecordsSchema>;
