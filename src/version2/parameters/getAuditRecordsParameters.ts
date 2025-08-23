import { z } from 'zod';

export const GetAuditRecordsParametersSchema = z.object({
  /** The number of records to skip before returning the first result. */
  offset: z.number().int().optional(),
  /** The maximum number of results to return. */
  limit: z.number().int().optional(),
  /** The strings to match with audit field content, space separated. */
  filter: z.string().optional(),
  /**
   * The date and time on or after which returned audit records must have been created. If `to` is provided `from` must
   * be before `to` or no audit records are returned.
   */
  from: z.string().optional(),
  /**
   * The date and time on or before which returned audit results must have been created. If `from` is provided `to` must
   * be after `from` or no audit records are returned.
   */
  to: z.string().optional(),
});

export type GetAuditRecordsParameters = z.infer<typeof GetAuditRecordsParametersSchema>;
