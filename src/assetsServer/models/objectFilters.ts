import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectIQLFilterParamSchema } from './objectIQLFilterParam';
import { ObjectFilterParamsSchema } from './objectFilterParams';

export const ObjectFiltersSchema = apiObject({
  objectSchemaId: z.number().optional(),
  qlQuerySearch: z.boolean().optional(),
  qlQueryParams: ObjectIQLFilterParamSchema.optional(),
  filterParams: ObjectFilterParamsSchema.optional(),
  iqlSearch: z.boolean().optional(),
  iqlParams: ObjectIQLFilterParamSchema.optional(),
});

export type ObjectFilters = z.infer<typeof ObjectFiltersSchema>;
