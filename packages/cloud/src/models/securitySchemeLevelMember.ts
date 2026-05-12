import { z } from 'zod';

export const SecuritySchemeLevelMemberSchema = z.object({
  /** The value corresponding to the specified member type. */
  parameter: z.string().optional(),
  /** The issue security level member type, e.g `reporter`, `group`, `user`, `projectrole`, `applicationRole`. */
  type: z.string(),
});

export type SecuritySchemeLevelMember = z.infer<typeof SecuritySchemeLevelMemberSchema>;
