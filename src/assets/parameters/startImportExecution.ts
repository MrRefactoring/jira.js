import { z } from 'zod';

export const StartImportExecutionSchema = z.object({
  /** The importSourceId of the import source configuration for the external import */
  importSourceId: z.string(),
});

export type StartImportExecution = z.input<typeof StartImportExecutionSchema>;
