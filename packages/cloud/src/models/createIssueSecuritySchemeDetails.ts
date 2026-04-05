import { z } from 'zod';
import { SecuritySchemeLevelSchema } from '#/models/securitySchemeLevel';

/** Issue security scheme and it's details */
export const CreateIssueSecuritySchemeDetailsSchema = z.object({
  /** The description of the issue security scheme. */
  description: z.string().max(255, 'description must be at most 255 characters').optional(),
  /** The list of scheme levels which should be added to the security scheme. */
  levels: z.array(SecuritySchemeLevelSchema).optional(),
  /** The name of the issue security scheme. Must be unique (case-insensitive). */
  name: z.string().max(60, 'name must be at most 60 characters'),
});

export type CreateIssueSecuritySchemeDetails = z.infer<typeof CreateIssueSecuritySchemeDetailsSchema>;
