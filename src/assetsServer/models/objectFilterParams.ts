import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectFilterValuesSchema } from './objectFilterValues';
import { ObjectTypeAttributesToDisplaySchema } from './objectTypeAttributesToDisplay';

export const ObjectFilterParamsSchema = apiObject({
  page: z.number().optional(),
  asc: z.number().optional(),
  objectTypeId: z.number().optional(),
  objectId: z.number().optional(),
  objectSchemaId: z.number().optional(),
  resultsPerPage: z.number().optional(),
  orderByTypeAttrId: z.number().optional(),
  filters: z.array(ObjectFilterValuesSchema).optional(),
  includeAttributes: z.boolean().optional(),
  attributesToDisplay: ObjectTypeAttributesToDisplaySchema.optional(),
  attributesToDisplayIds: z.array(z.number()).optional(),
});

export type ObjectFilterParams = z.infer<typeof ObjectFilterParamsSchema>;
