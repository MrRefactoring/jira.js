import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectAttributeInSchema } from './objectAttributeIn';
/** Representing an object to be created or updated */

export const AssetObjectInSchema = apiObject({
  /** The object type determines where the object should be stored and which attributes are available */
  objectTypeId: z.string(),
  attributes: z.array(ObjectAttributeInSchema),
  hasAvatar: z.boolean().optional(),
  /** The UUID as retrieved by uploading an avatar. */
  avatarUUID: z.string().optional(),
});

export type AssetObjectIn = z.infer<typeof AssetObjectInSchema>;
