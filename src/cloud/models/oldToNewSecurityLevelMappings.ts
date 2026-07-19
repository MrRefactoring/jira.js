import { z } from 'zod';
import { apiObject } from '#/core';

export const OldToNewSecurityLevelMappingsSchema = apiObject({
  /** The new issue security level ID. Providing null will clear the assigned old level from issues. */
  newLevelId: z.string(),
  /** The old issue security level ID. Providing null will remap all issues without any assigned levels. */
  oldLevelId: z.string(),
});

export type OldToNewSecurityLevelMappings = z.infer<typeof OldToNewSecurityLevelMappingsSchema>;
