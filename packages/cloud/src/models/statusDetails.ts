import { z } from 'zod';
import { ScopeSchema } from '#/models/scope';
import { StatusCategorySchema } from '#/models/statusCategory';

/** A status. */
export const StatusDetailsSchema = z.object({
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
