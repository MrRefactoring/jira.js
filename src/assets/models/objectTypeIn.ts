import { z } from 'zod';
import { apiObject } from '#/core';
/** The Assets object type input used for creating object types */

export const ObjectTypeInSchema = apiObject({
  name: z.string(),
  description: z.string().optional(),
  iconId: z.string(),
  objectSchemaId: z.string(),
  /** The id of the parent object type */
  parentObjectTypeId: z.string().optional(),
  /**
   * Describes if this object type is configured for inheritance i.e. it's children inherits the attributes of this
   * object type
   */
  inherited: z.boolean().optional(),
  abstractObjectType: z.boolean().optional(),
});

export type ObjectTypeIn = z.infer<typeof ObjectTypeInSchema>;
