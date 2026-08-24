import { z } from 'zod';
import { apiObject } from '#/core';
import { AssetObjectSchema } from './assetObject';
import { ObjectTypeAttributeSchema } from './objectTypeAttribute';
/** A result list containing objects and object type attributes */

export const ObjectListInclTypeAttributesEntryResultSchema = apiObject({
  startAt: z.number(),
  maxResults: z.number(),
  /** The objects */
  values: z.array(AssetObjectSchema),
  /** The object type attributes */
  objectTypeAttributes: z.array(ObjectTypeAttributeSchema),
  last: z.boolean(),
  isLast: z.boolean(),
});

export type ObjectListInclTypeAttributesEntryResult = z.infer<typeof ObjectListInclTypeAttributesEntryResultSchema>;
