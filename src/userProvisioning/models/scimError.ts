import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** SCIM Error */

export const ScimErrorSchema = apiObject({
  /** SCIM error schemas. */
  schemas: z.array(z.string()).optional(),
  /** The HTTP status code. */
  status: z.string().optional(),
  /** Keyword for SCIM detail error. */
  scimType: openEnum([
    'invalidFilter',
    'tooMany',
    'uniqueness',
    'mutability',
    'invalidSyntax',
    'invalidPath',
    'noTarget',
    'invalidValue',
    'invalidVers',
    'sensitive',
  ]).optional(),
  /** Detailed human-readable message. */
  detail: z.string().optional(),
});

export type ScimError = z.infer<typeof ScimErrorSchema>;
