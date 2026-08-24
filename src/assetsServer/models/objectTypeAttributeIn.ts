import { z } from 'zod';
import { apiObject } from '#/core';

export const ObjectTypeAttributeInSchema = apiObject({
  expand: z.string().optional(),
  project: z.string().optional(),
  position: z.string().optional(),
  after: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  label: z.string().optional(),
  description: z.string().optional(),
  type: z.number(),
  defaultTypeId: z.number().optional(),
  typeValue: z.string().optional(),
  typeValueMulti: z.array(z.string()).optional(),
  additionalValue: z.string().optional(),
  minimumCardinality: z.number().optional(),
  maximumCardinality: z.number().optional(),
  removeExcessCardinality: z.boolean().optional(),
  suffix: z.string().optional(),
  hidden: z.string().optional(),
  includeChildObjectTypes: z.string().optional(),
  uniqueAttribute: z.string().optional(),
  summable: z.string().optional(),
  indexed: z.string().optional(),
  regexValidation: z.string().optional(),
  qlQuery: z.string().optional(),
  options: z.string().optional(),
  iql: z.string().optional(),
});

export type ObjectTypeAttributeIn = z.infer<typeof ObjectTypeAttributeInSchema>;
