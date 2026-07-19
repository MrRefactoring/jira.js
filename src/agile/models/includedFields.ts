import { z } from 'zod';
import { apiObject } from '#/core';

export const IncludedFieldsSchema = apiObject({
  actuallyIncluded: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  included: z.array(z.string()).optional(),
});

export type IncludedFields = z.infer<typeof IncludedFieldsSchema>;
