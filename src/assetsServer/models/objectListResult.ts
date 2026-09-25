import { z } from 'zod';
import { apiObject } from '#/core';
import { AssetObjectSchema, type AssetObject, type AssetObjectInput } from './assetObject';
import { ObjectTypeAttributeSchema } from './objectTypeAttribute';
import { ObjectFilterValuesSchema } from './objectFilterValues';
import { ObjectAttributeSchema, type ObjectAttribute, type ObjectAttributeInput } from './objectAttribute';
import { ObjectTypeInheritanceTreeSchema } from './objectTypeInheritanceTree';

export const ObjectListResultSchema = apiObject({
  objectEntries: z.array(AssetObjectSchema as z.ZodType<AssetObject, AssetObjectInput>).optional(),
  objectTypeAttributes: z.array(ObjectTypeAttributeSchema).optional(),
  objectTypeId: z.number().optional(),
  objectTypeIsInherited: z.boolean().optional(),
  abstractObjectType: z.boolean().optional(),
  totalFilterCount: z.number().optional(),
  startIndex: z.number().optional(),
  toIndex: z.number().optional(),
  pageObjectSize: z.number().optional(),
  pageNumber: z.number().optional(),
  orderByTypeAttrId: z.number().optional(),
  orderWay: z.string().optional(),
  filters: z.array(ObjectFilterValuesSchema).optional(),
  qlQuery: z.string().optional(),
  qlQuerySearchResult: z.boolean().optional(),
  conversionPossible: z.boolean().optional(),
  matchedFilterValues: z.array(ObjectAttributeSchema as z.ZodType<ObjectAttribute, ObjectAttributeInput>).optional(),
  inheritanceTree: ObjectTypeInheritanceTreeSchema.optional(),
  orderAscending: z.boolean().optional(),
  iql: z.string().optional(),
  iqlSearchResult: z.boolean().optional(),
  pageSize: z.number().optional(),
});

export type ObjectListResult = z.infer<typeof ObjectListResultSchema>;
