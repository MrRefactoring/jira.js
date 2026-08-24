import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldIdentifierObjectSchema } from './fieldIdentifierObject';

export const FieldIdIdentifierSchema = apiObject(FieldIdentifierObjectSchema.shape).extend({
  identifier: z.string().optional(),
});

export type FieldIdIdentifier = z.infer<typeof FieldIdIdentifierSchema>;
