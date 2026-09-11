import { z } from 'zod';
import { ApplicationRoleSchema } from '../models';

export const UpdateApplicationRoleSchema = z.object({
  'If-Match': z.string().optional(),
  /** The hash of the version to update. Optional Param */
  versionHash: z.string().optional(),
  /** The key of the role to update. */
  key: z.string(),
  body: ApplicationRoleSchema.optional(),
});

export type UpdateApplicationRole = z.input<typeof UpdateApplicationRoleSchema>;
