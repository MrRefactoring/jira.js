import { z } from 'zod';
import { StatusMigrationSchema } from './statusMigration';

/** The mapping of old to new status ID for a specific project and issue type. */
export const StatusMappingDTOSchema = z.object({
  /** The issue type for the status mapping. */
  issueTypeId: z.string(),
  /** The project for the status mapping. */
  projectId: z.string(),
  /** The list of old and new status ID mappings for the specified project and issue type. */
  statusMigrations: z.array(StatusMigrationSchema),
});

export type StatusMappingDTO = z.infer<typeof StatusMappingDTOSchema>;
