import { z } from 'zod';
import { AssociatedItemSchema } from '#/models/associatedItem';
import { ChangedValueSchema } from '#/models/changedValue';

/** An audit record. */
export const AuditRecordSchema = z.object({
  /** The list of items associated with the changed record. */
  associatedItems: z.array(AssociatedItemSchema).optional(),
  /**
   * The category of the audit record. For a list of these categories, see the help article [Auditing in Jira
   * applications](https://confluence.atlassian.com/x/noXKM).
   */
  category: z.string().optional(),
  /** The list of values changed in the record event. */
  changedValues: z.array(ChangedValueSchema).optional(),
  /** The date and time on which the audit record was created. */
  created: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  /** The description of the audit record. */
  description: z.string().optional(),
  /** The event the audit record originated from. */
  eventSource: z.string().optional(),
  /** The ID of the audit record. */
  id: z.number().optional(),
  objectItem: AssociatedItemSchema.optional(),
  /** The URL of the computer where the creation of the audit record was initiated. */
  remoteAddress: z.string().optional(),
  /** The summary of the audit record. */
  summary: z.string().optional(),
});

export type AuditRecord = z.infer<typeof AuditRecordSchema>;
