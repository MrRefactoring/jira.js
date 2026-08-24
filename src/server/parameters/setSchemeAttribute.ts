import { z } from 'zod';

export const SetSchemeAttributeSchema = z.object({
  /** The id of the permission scheme. */
  permissionSchemeId: z.number(),
  /** The key of the permission scheme attribute. */
  key: z.string(),
  body: z.string().optional(),
});

export type SetSchemeAttribute = z.input<typeof SetSchemeAttributeSchema>;
