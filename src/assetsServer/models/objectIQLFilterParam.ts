import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectTypeAttributesToDisplaySchema } from './objectTypeAttributesToDisplay';

export const ObjectIQLFilterParamSchema = apiObject({
  page: z.number().optional(),
  asc: z.number().optional(),
  objectTypeId: z.number().optional(),
  objectId: z.number().optional(),
  objectSchemaId: z.number().optional(),
  qlQuery: z.string().optional(),
  resultsPerPage: z.number().optional(),
  orderByTypeAttrId: z.number().optional(),
  includeAttributes: z.boolean().optional(),
  attributesToDisplay: ObjectTypeAttributesToDisplaySchema.optional(),
  iql: z.string().optional(),
});

export type ObjectIQLFilterParam = z.infer<typeof ObjectIQLFilterParamSchema>;
