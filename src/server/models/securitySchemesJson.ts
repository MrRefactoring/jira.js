import { z } from 'zod';
import { apiObject } from '#/core';
import { SecuritySchemeJsonSchema } from './securitySchemeJson';

export const SecuritySchemesJsonSchema = apiObject({
  issueSecuritySchemes: z.array(SecuritySchemeJsonSchema).optional(),
});

export type SecuritySchemesJson = z.infer<typeof SecuritySchemesJsonSchema>;
