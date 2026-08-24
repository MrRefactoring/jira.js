import { z } from 'zod';
import { apiObject } from '#/core';
import { IconSchema } from './icon';
/** The Assets object type */

export const ObjectTypeSchema = apiObject({
  workspaceId: z.string(),
  globalId: z.string(),
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  icon: IconSchema,
  position: z.number(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
  objectCount: z.number(),
  /** The id of the parent object type */
  parentObjectTypeId: z.number().optional(),
  /** The type of the attribute */
  type: z.number().optional(),
  objectSchemaId: z.string(),
  /**
   * Describes if this object type is configured for inheritance i.e. it's children inherits the attributes of this
   * object type
   */
  inherited: z.boolean(),
  abstractObjectType: z.boolean(),
  /**
   * Describes if this object types parent is inherited i.e. this object type has attributes that are inherited from one
   * or more parents
   */
  parentObjectTypeInherited: z.boolean(),
});

export type ObjectType = z.infer<typeof ObjectTypeSchema>;
