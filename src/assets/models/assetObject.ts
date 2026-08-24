import { z } from 'zod';
import { apiObject } from '#/core';
import { AvatarSchema } from './avatar';
import { ObjectTypeSchema } from './objectType';
import { ObjectAttributeSchema } from './objectAttribute';
/** An Assets object */

export const AssetObjectSchema = apiObject({
  workspaceId: z.string(),
  globalId: z.string(),
  id: z.string(),
  /**
   * The name of the object. This value is fetched from the attribute that is currently marked as label for the object
   * type of this object
   */
  label: z.string(),
  /** The external identifier for this object */
  objectKey: z.string(),
  avatar: AvatarSchema,
  objectType: ObjectTypeSchema,
  created: z.coerce.date(),
  updated: z.coerce.date(),
  hasAvatar: z.boolean(),
  timestamp: z.number(),
  attributes: z.array(ObjectAttributeSchema).optional(),
  _links: apiObject({
    self: z.string(),
  }),
});

export type AssetObject = z.infer<typeof AssetObjectSchema>;
