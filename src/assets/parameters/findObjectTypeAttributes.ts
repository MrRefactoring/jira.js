import { z } from 'zod';

export const FindObjectTypeAttributesSchema = z.object({
  onlyValueEditable: z.boolean().optional(),
  orderByName: z.boolean().optional(),
  query: z.string().optional(),
  includeValuesExist: z.boolean().optional(),
  excludeParentAttributes: z.boolean().optional(),
  includeChildren: z.boolean().optional(),
  orderByRequired: z.boolean().optional(),
  id: z.string(),
});

export type FindObjectTypeAttributes = z.input<typeof FindObjectTypeAttributesSchema>;
