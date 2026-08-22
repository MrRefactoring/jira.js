import { z } from 'zod';

export const DeleteImportScheduleSchema = z.object({
  /** The ID of the import source */
  importSourceId: z.string(),
  /** The ID of the import schedule to delete */
  importScheduleId: z.string(),
});

export type DeleteImportSchedule = z.input<typeof DeleteImportScheduleSchema>;
