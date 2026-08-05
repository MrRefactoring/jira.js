import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ProjectDetailsSchema } from './projectDetails';
/**
 * The projects the item is associated with. Indicated for items associated with [next-gen
 * projects](https://confluence.atlassian.com/x/loMyO).
 */

export const ScopeSchema = apiObject({
  project: ProjectDetailsSchema.optional(),
  /** The type of scope. */
  type: openEnum(['PROJECT', 'TEMPLATE']).optional(),
});

export type Scope = z.infer<typeof ScopeSchema>;
