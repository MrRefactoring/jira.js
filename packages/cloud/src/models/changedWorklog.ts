import { z } from 'zod';
import { EntityPropertySchema } from '#/models/entityProperty';

/** Details of a changed worklog. */
export const ChangedWorklogSchema = z.object({
  /** Details of properties associated with the change. */
  properties: z.array(EntityPropertySchema).optional(),
  /** The datetime of the change. */
  updatedTime: z.number().optional(),
  /** The ID of the worklog. */
  worklogId: z.number().optional(),
});

export type ChangedWorklog = z.infer<typeof ChangedWorklogSchema>;
