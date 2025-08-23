import { z } from 'zod';

export const OldToNewSecurityLevelMappingsBeanSchema = z.object({
  /** The new issue security level ID. Providing null will clear the assigned old level from issues. */
  newLevelId: z.string(),
  /** The old issue security level ID. Providing null will remap all issues without any assigned levels. */
  oldLevelId: z.string(),
});

export type OldToNewSecurityLevelMappingsBean = z.infer<typeof OldToNewSecurityLevelMappingsBeanSchema>;
