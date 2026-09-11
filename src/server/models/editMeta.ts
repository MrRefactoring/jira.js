import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldMetaSchema } from './fieldMeta';

export const EditMetaSchema = apiObject({
  fields: z.record(z.string(), FieldMetaSchema).optional(),
});

export type EditMeta = z.infer<typeof EditMetaSchema>;
