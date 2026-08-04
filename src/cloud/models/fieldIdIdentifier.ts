import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldIdentifierObjectSchema } from '../models';

export const FieldIdIdentifierSchema = apiObject({}).extend(FieldIdentifierObjectSchema.shape).extend({
  identifier: z.string().optional(),
});

export type FieldIdIdentifier = z.infer<typeof FieldIdIdentifierSchema>;
