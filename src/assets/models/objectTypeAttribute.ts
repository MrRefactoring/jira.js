import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectTypeSchema } from './objectType';
import { DefaultTypeSchema } from './defaultType';
import { ReferenceTypeSchema } from './referenceType';
/** The definition of the attribute that is associated with an object type */

export const ObjectTypeAttributeSchema = apiObject({
  workspaceId: z.string(),
  globalId: z.string(),
  id: z.string(),
  objectType: ObjectTypeSchema.optional(),
  name: z.string().optional(),
  label: z.boolean(),
  /**
   * | Value | Description      |
   * | ----- | ---------------- |
   * | 0     | Default          |
   * | 1     | Object reference |
   * | 2     | User             |
   * | 4     | Group            |
   * | 7     | Status           |
   */
  type: z.number().optional(),
  description: z.string().optional(),
  defaultType: DefaultTypeSchema.optional(),
  typeValue: z.string().optional(),
  typeValueMulti: z.array(z.string()).optional(),
  additionalValue: z.string().optional(),
  referenceType: ReferenceTypeSchema.optional(),
  referenceObjectTypeId: z.string().optional(),
  referenceObjectType: ObjectTypeSchema.optional(),
  editable: z.boolean().optional(),
  system: z.boolean().optional(),
  /**
   * Describes if this object type attribute is indexed. For an indexed attribute the AQL search will be faster, but
   * this will affect memory consumption.
   */
  indexed: z.boolean(),
  sortable: z.boolean().optional(),
  summable: z.boolean().optional(),
  minimumCardinality: z.number().optional(),
  maximumCardinality: z.number().optional(),
  suffix: z.string().optional(),
  removable: z.boolean().optional(),
  hidden: z.boolean().optional(),
  includeChildObjectTypes: z.boolean().optional(),
  uniqueAttribute: z.boolean().optional(),
  regexValidation: z.string().optional(),
  qlQuery: z.string().optional(),
  options: z.string().optional(),
  position: z.number(),
});

export type ObjectTypeAttribute = z.infer<typeof ObjectTypeAttributeSchema>;
