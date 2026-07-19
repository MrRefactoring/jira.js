import { z } from 'zod';
import { apiObject } from '#/core';

export const SecuritySchemeLevelMemberSchema = apiObject({
  /** The value corresponding to the specified member type. */
  parameter: z.string().optional(),
  /** The issue security level member type, e.g `reporter`, `group`, `user`, `projectrole`, `applicationRole`. */
  type: z.string(),
});

export type SecuritySchemeLevelMember = z.infer<typeof SecuritySchemeLevelMemberSchema>;
