import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldValueLoaderSchema } from './fieldValueLoader';

export const NavigableFieldSchema = apiObject({
  columnCssClass: z.string().optional(),
  columnHeadingKey: z.string().optional(),
  defaultSortOrder: z.string().optional(),
  hiddenFieldId: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  nameKey: z.string().optional(),
  valueLoader: FieldValueLoaderSchema.optional(),
});

export type NavigableField = z.infer<typeof NavigableFieldSchema>;
