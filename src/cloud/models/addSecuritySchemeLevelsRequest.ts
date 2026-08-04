import { z } from 'zod';
import { apiObject } from '#/core';
import { SecuritySchemeLevelSchema } from './securitySchemeLevel';

export const AddSecuritySchemeLevelsRequestSchema = apiObject({
  /** The list of scheme levels which should be added to the security scheme. */
  levels: z.array(SecuritySchemeLevelSchema).optional(),
});

export type AddSecuritySchemeLevelsRequest = z.infer<typeof AddSecuritySchemeLevelsRequestSchema>;
