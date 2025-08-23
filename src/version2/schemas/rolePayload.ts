import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/**
 * The payload used to create a project role. It is optional for CMP projects, as a default role actor will be provided.
 * TMP will add new role actors to the table.
 */
export const RolePayloadSchema = z.object({
  /** The default actors for the role. By adding default actors, the role will be added to any future projects created */
  defaultActors: z.array(ProjectCreateResourceIdentifierSchema).optional(),
  /** The description of the role */
  description: z.string().optional(),
  /** The name of the role */
  name: z.string().optional(),
  /**
   * The strategy to use when there is a conflict with an existing project role. FAIL - Fail execution, this always
   * needs to be unique; USE - Use the existing entity and ignore new entity parameters
   */
  onConflict: z.enum(['FAIL', 'USE', 'NEW']).optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /** The type of the role. Only used by project-scoped project */
  type: z.enum(['HIDDEN', 'VIEWABLE', 'EDITABLE']).optional(),
});

export type RolePayload = z.infer<typeof RolePayloadSchema>;
