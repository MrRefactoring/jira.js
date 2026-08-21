import { z } from 'zod';
import { ImportScheduleRequestSchema } from '../models';

export const UpdateImportScheduleSchema = z.object(ImportScheduleRequestSchema.shape).extend({
  /** The ID of the import source */
  importSourceId: z.string(),
  /** The ID of the import schedule to update */
  importScheduleId: z.string(),
});

export type UpdateImportSchedule = z.input<typeof UpdateImportScheduleSchema>;
