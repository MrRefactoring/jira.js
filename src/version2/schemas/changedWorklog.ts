import { z } from 'zod';
import { EntityPropertySchema } from './entityProperty';

/** Details of a changed worklog. */
export const ChangedWorklogSchema = z.object({
  /** Details of properties associated with the change. */
  properties: z.array(EntityPropertySchema).optional(),
  /** The datetime of the change. */
  updatedTime: z.number().int().optional(),
  /** The ID of the worklog. */
  worklogId: z.number().int().optional(),
});

export type ChangedWorklog = z.infer<typeof ChangedWorklogSchema>;
