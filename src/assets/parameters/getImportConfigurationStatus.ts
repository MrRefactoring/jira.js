import { z } from 'zod';

export const GetImportConfigurationStatusSchema = z.object({
  /** The importSourceId of the import source configuration for the external import */
  importSourceId: z.string(),
});

export type GetImportConfigurationStatus = z.input<typeof GetImportConfigurationStatusSchema>;
