import { z } from 'zod';
import { apiObject } from '#/core';
import { ScopeSchema } from './scope';
import { StatusCategorySchema } from './statusCategory';
/** A status. */

export const StatusDetailsSchema = apiObject({
  /** The description of the status. */
  description: z.string().optional(),
  /** The URL of the icon used to represent the status. */
  iconUrl: z.string().optional(),
  /** The ID of the status. */
  id: z.string().optional(),
  /** The name of the status. */
  name: z.string().optional(),
  scope: ScopeSchema.optional(),
  /** The URL of the status. */
  self: z.string().optional(),
  statusCategory: StatusCategorySchema.optional(),
});

export type StatusDetails = z.infer<typeof StatusDetailsSchema>;
