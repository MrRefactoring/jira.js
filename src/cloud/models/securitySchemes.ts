import { z } from 'zod';
import { apiObject } from '#/core';
import { SecuritySchemeSchema } from './securityScheme';
/** List of security schemes. */

export const SecuritySchemesSchema = apiObject({
  /** List of security schemes. */
  issueSecuritySchemes: z.array(SecuritySchemeSchema).optional(),
});

export type SecuritySchemes = z.infer<typeof SecuritySchemesSchema>;
