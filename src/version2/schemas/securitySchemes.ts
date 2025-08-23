import { z } from 'zod';
import { SecuritySchemeSchema } from './securityScheme';

/** List of security schemes. */
export const SecuritySchemesSchema = z.object({
  /** List of security schemes. */
  issueSecuritySchemes: z.array(SecuritySchemeSchema).optional(),
});

export type SecuritySchemes = z.infer<typeof SecuritySchemesSchema>;
