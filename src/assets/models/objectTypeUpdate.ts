import { z } from 'zod';
import { apiObject } from '#/core';
/** The Assets object type input used for updating object types */

export const ObjectTypeUpdateSchema = apiObject({
  name: z.string().optional(),
  description: z.string().optional(),
  iconId: z.string().optional(),
  /**
   * Describes if this object type is configured for inheritance i.e. it's children inherits the attributes of this
   * object type
   */
  inherited: z.boolean().optional(),
  abstractObjectType: z.boolean().optional(),
});

export type ObjectTypeUpdate = z.infer<typeof ObjectTypeUpdateSchema>;
