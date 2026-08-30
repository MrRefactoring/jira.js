import { z } from 'zod';
import { apiObject } from '#/core';
import { AssetObjectSchema } from './assetObject';
import { ObjectTypeAttributeSchema } from './objectTypeAttribute';
/** A result list containing objects */

export const ObjectListResultSchema = apiObject({
  /** The actual objects */
  objectEntries: z.array(AssetObjectSchema),
  /** The object type attributes that are present in the object entries */
  objectTypeAttributes: z.array(ObjectTypeAttributeSchema).optional(),
  /** Deprecated field that shows which object type id the result is for. Not applicable when using AQL */
  objectTypeId: z.string().optional(),
  /** Deprecated field should not be used. */
  objectTypeIsInherited: z.boolean().optional(),
  /** Deprecated field should not be used. */
  abstractObjectType: z.boolean().optional(),
  /** The offset of the first object in the search query that is present in the result, used for pagination */
  startIndex: z.number(),
  /** The index of the last object present in the result of the search query */
  toIndex: z.number(),
  /** The amount of objects currently returned per page in the result set */
  pageObjectSize: z.number(),
  /** The current page of objects in the result set pagination */
  pageNumber: z.number(),
  /** Deprecated field - The object type attribute id used for sorting */
  orderByTypeAttrId: z.number().optional(),
  /** Deprecated field - The sort order, used in conjunction with the orderByTypeAttrId */
  orderWay: z.string().optional(),
  /** Deprecated field - The field is used for basic search */
  filters: z.record(z.string(), z.any()).optional(),
  /** The AQL that was used to find the object result set */
  qlQuery: z.string(),
  /** Determines if the query was based on an AQL or by basic search */
  qlQuerySearchResult: z.boolean().optional(),
  /** Is it possible to transform this AQL to basic search or vice versa */
  conversionPossible: z.boolean().optional(),
  /** Deprecated field should not be used */
  matchedFilterValues: z.record(z.string(), z.any()).optional(),
  /** Deprecated field should not be used */
  inheritanceTree: z.record(z.string(), z.any()).optional(),
});

export type ObjectListResult = z.infer<typeof ObjectListResultSchema>;
