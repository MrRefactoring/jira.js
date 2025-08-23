import { z } from 'zod';

export const SecuritySchemeLevelMemberBeanSchema = z.object({
  /** The value corresponding to the specified member type. */
  parameter: z.string().optional(),
  /** The issue security level member type, e.g `reporter`, `group`, `user`, `projectrole`, `applicationRole`. */
  type: z.string(),
});

export type SecuritySchemeLevelMemberBean = z.infer<typeof SecuritySchemeLevelMemberBeanSchema>;
