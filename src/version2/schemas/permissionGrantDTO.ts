import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/** List of permission grants */
export const PermissionGrantDTOSchema = z.object({
  applicationAccess: z.array(z.string()).optional(),
  groupCustomFields: z.array(ProjectCreateResourceIdentifierSchema).optional(),
  groups: z.array(ProjectCreateResourceIdentifierSchema).optional(),
  permissionKeys: z.array(z.string()).optional(),
  projectRoles: z.array(ProjectCreateResourceIdentifierSchema).optional(),
  specialGrants: z.array(z.string()).optional(),
  userCustomFields: z.array(ProjectCreateResourceIdentifierSchema).optional(),
  users: z.array(ProjectCreateResourceIdentifierSchema).optional(),
});

export type PermissionGrantDTO = z.infer<typeof PermissionGrantDTOSchema>;
