import { z } from 'zod';
import { AuditRecordSchema } from '#/models/auditRecord';

/** Container for a list of audit records. */
export const AuditRecordsSchema = z.object({
  /** The requested or default limit on the number of audit items to be returned. */
  limit: z.number().optional(),
  /** The number of audit items skipped before the first item in this list. */
  offset: z.number().optional(),
  /** The list of audit items. */
  records: z.array(AuditRecordSchema).optional(),
  /** The total number of audit items returned. */
  total: z.number().optional(),
});

export type AuditRecords = z.infer<typeof AuditRecordsSchema>;
