import { z } from 'zod';

export const FindObjectTypeAttributesSchema = z.object({
  /** Should the response be ordered by the number of required attributes. */
  orderByRequired: z.string().optional(),
  /** Should the response be ordered by name. */
  orderByName: z.string().optional(),
  /** Should the response include child attributes. */
  includeChildren: z.string().optional(),
  /** Filter attributes that start with the query. */
  query: z.string().optional(),
  /** Should the response exclude parent attributes. */
  excludeParentAttributes: z.string().optional(),
  /** Should the response only include attributes where attribute values exists. */
  includeValueExist: z.string().optional(),
  /** The ID of the object type to retrieve attributes for. */
  id: z.string(),
  /** Should the response only include attributes where only the value is editable. */
  onlyValueEditable: z.string().optional(),
});

export type FindObjectTypeAttributes = z.input<typeof FindObjectTypeAttributesSchema>;
