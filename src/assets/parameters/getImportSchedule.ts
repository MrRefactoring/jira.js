import { z } from 'zod';

export const GetImportScheduleSchema = z.object({
  /** The ID of the import source */
  importSourceId: z.string(),
  /** The ID of the import schedule */
  importScheduleId: z.string(),
});

export type GetImportSchedule = z.input<typeof GetImportScheduleSchema>;
