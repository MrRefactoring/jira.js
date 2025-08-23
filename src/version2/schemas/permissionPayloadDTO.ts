import { z } from 'zod';
import { PermissionGrantDTOSchema } from './permissionGrantDTO';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/** The payload to create a permission scheme */
export const PermissionPayloadDTOSchema = z.object({
  /** Configuration to generate addon role. Default is false if null. Only applies to GLOBAL-scoped permission scheme */
  addAddonRole: z.boolean().optional(),
  /** The description of the permission scheme */
  description: z.string().optional(),
  /** List of permission grants */
  grants: z.array(PermissionGrantDTOSchema).optional(),
  /** The name of the permission scheme */
  name: z.string().optional(),
  /**
   * The strategy to use when there is a conflict with an existing permission scheme. FAIL - Fail execution, this always
   * needs to be unique; USE - Use the existing entity and ignore new entity parameters; NEW - If the entity exist, try
   * and create a new one with a different name
   */
  onConflict: z.enum(['FAIL', 'USE', 'NEW']).optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type PermissionPayloadDTO = z.infer<typeof PermissionPayloadDTOSchema>;
