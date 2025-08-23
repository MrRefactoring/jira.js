import { z } from 'zod';
import { SecuritySchemeLevelSchema } from './securitySchemeLevel';

export const CreateIssueSecuritySchemeParametersSchema = z.object({
  /** The description of the issue security scheme. */
  description: z.string().optional(),
  /** The list of scheme levels which should be added to the security scheme. */
  levels: z.array(SecuritySchemeLevelSchema).optional(),
  /** The name of the issue security scheme. Must be unique (case-insensitive). */
  name: z.string(),
});

export type CreateIssueSecuritySchemeParameters = z.infer<typeof CreateIssueSecuritySchemeParametersSchema>;
