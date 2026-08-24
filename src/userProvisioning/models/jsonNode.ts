import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const JsonNodeSchema = apiObject({
  array: z.boolean().optional(),
  null: z.boolean().optional(),
  valueNode: z.boolean().optional(),
  containerNode: z.boolean().optional(),
  missingNode: z.boolean().optional(),
  object: z.boolean().optional(),
  nodeType: openEnum([
    'ARRAY',
    'BINARY',
    'BOOLEAN',
    'MISSING',
    'NULL',
    'NUMBER',
    'OBJECT',
    'POJO',
    'STRING',
  ]).optional(),
  pojo: z.boolean().optional(),
  number: z.boolean().optional(),
  integralNumber: z.boolean().optional(),
  floatingPointNumber: z.boolean().optional(),
  short: z.boolean().optional(),
  int: z.boolean().optional(),
  long: z.boolean().optional(),
  double: z.boolean().optional(),
  bigDecimal: z.boolean().optional(),
  bigInteger: z.boolean().optional(),
  textual: z.boolean().optional(),
  boolean: z.boolean().optional(),
  binary: z.boolean().optional(),
  float: z.boolean().optional(),
});

export type JsonNode = z.infer<typeof JsonNodeSchema>;
