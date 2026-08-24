import { z } from 'zod';

export const GetImportScheduleLinksSchema = z.object({
  /** The importSourceId of the import source configuration for the external import */
  importSourceId: z.string(),
});

export type GetImportScheduleLinks = z.input<typeof GetImportScheduleLinksSchema>;
