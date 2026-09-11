import { z } from 'zod';

export const GetSchemeAttributeSchema = z.object({
  /** The id of the permission scheme. */
  permissionSchemeId: z.number(),
  /** The key of the permission scheme attribute. */
  attributeKey: z.string(),
});

export type GetSchemeAttribute = z.input<typeof GetSchemeAttributeSchema>;
