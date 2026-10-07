import { z } from 'zod';

export const FindObjectTypeAttributesSchema = z.object({
  onlyValueEditable: z.boolean().optional(),
  orderByName: z.boolean().optional(),
  /**
   * A comma-separated list of case-insensitive prefixes; an attribute is included when its name or display name starts
   * with any value
   */
  query: z.union([z.string(), z.array(z.string())]).optional(),
  includeValuesExist: z.boolean().optional(),
  excludeParentAttributes: z.boolean().optional(),
  includeChildren: z.boolean().optional(),
  orderByRequired: z.boolean().optional(),
  id: z.string(),
});

export type FindObjectTypeAttributes = z.input<typeof FindObjectTypeAttributesSchema>;
