import { z } from 'zod';
import { ImportScheduleRequestSchema } from '../models';

export const CreateImportScheduleSchema = z.object(ImportScheduleRequestSchema.shape).extend({
  /** The ID of the import source to schedule */
  importSourceId: z.string(),
});

export type CreateImportSchedule = z.input<typeof CreateImportScheduleSchema>;
