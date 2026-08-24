import { z } from 'zod';
import { apiObject } from '#/core';

export const IncludedFieldsSchema = apiObject({
  included: z.array(z.string()).optional(),
});

export type IncludedFields = z.infer<typeof IncludedFieldsSchema>;
