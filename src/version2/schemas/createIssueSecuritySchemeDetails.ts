import { z } from 'zod';
import { SecuritySchemeLevelSchema } from './securitySchemeLevel';

/** Issue security scheme and it's details */
export const CreateIssueSecuritySchemeDetailsSchema = z.object({
  /** The description of the issue security scheme. */
  description: z.string().optional(),
  /** The list of scheme levels which should be added to the security scheme. */
  levels: z.array(SecuritySchemeLevelSchema).optional(),
  /** The name of the issue security scheme. Must be unique (case-insensitive). */
  name: z.string(),
});

export type CreateIssueSecuritySchemeDetails = z.infer<typeof CreateIssueSecuritySchemeDetailsSchema>;
