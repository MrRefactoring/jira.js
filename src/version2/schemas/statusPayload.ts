import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/** The payload for creating a status */
export const StatusPayloadSchema = z.object({
  /** The description of the status */
  description: z.string().optional(),
  /** The name of the status */
  name: z.string().optional(),
  /**
   * The conflict strategy for the status already exists. FAIL - Fail execution, this always needs to be unique; USE -
   * Use the existing entity and ignore new entity parameters; NEW - Create a new entity
   */
  onConflict: z.enum(['FAIL', 'USE', 'NEW']).optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /** The status category of the status. The value is case-sensitive. */
  statusCategory: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
});

export type StatusPayload = z.infer<typeof StatusPayloadSchema>;
