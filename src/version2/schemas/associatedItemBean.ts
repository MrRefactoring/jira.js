import { z } from 'zod';

/** Details of an item associated with the changed record. */
export const AssociatedItemBeanSchema = z.object({
  /** The ID of the associated record. */
  id: z.string().optional(),
  /** The name of the associated record. */
  name: z.string().optional(),
  /** The ID of the associated parent record. */
  parentId: z.string().optional(),
  /** The name of the associated parent record. */
  parentName: z.string().optional(),
  /** The type of the associated record. */
  typeName: z.string().optional(),
});

export type AssociatedItemBean = z.infer<typeof AssociatedItemBeanSchema>;
