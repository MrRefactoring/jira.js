import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectTypeSchema } from './objectType';
import { DefaultTypeSchema } from './defaultType';
import { ReferenceTypeSchema } from './referenceType';
import { ApplicationLinkSchema } from './applicationLink';
import { ConfluenceSpaceSchema } from './confluenceSpace';
import { ProjectSchema } from './project';

export const ObjectTypeAttributeSchema = apiObject({
  id: z.number().optional(),
  objectType: ObjectTypeSchema.optional(),
  name: z.string().optional(),
  label: z.boolean().optional(),
  type: z.number().optional(),
  description: z.string().optional(),
  defaultType: DefaultTypeSchema.optional(),
  typeValue: z.string().optional(),
  typeValueMulti: z.array(z.string()).optional(),
  additionalValue: z.string().optional(),
  referenceType: ReferenceTypeSchema.optional(),
  referenceObjectTypeId: z.number().optional(),
  referenceObjectType: ObjectTypeSchema.optional(),
  confluenceTypeValue: ApplicationLinkSchema.optional(),
  confluenceAddValue: ConfluenceSpaceSchema.optional(),
  versionTypeValues: z.array(ProjectSchema).optional(),
  editable: z.boolean().optional(),
  system: z.boolean().optional(),
  sortable: z.boolean().optional(),
  summable: z.boolean().optional(),
  indexed: z.boolean().optional(),
  minimumCardinality: z.number().optional(),
  maximumCardinality: z.number().optional(),
  suffix: z.string().optional(),
  removable: z.boolean().optional(),
  objectAttributeExists: z.boolean().optional(),
  hidden: z.boolean().optional(),
  includeChildObjectTypes: z.boolean().optional(),
  uniqueAttribute: z.boolean().optional(),
  regexValidation: z.string().optional(),
  qlQuery: z.string().optional(),
  options: z.string().optional(),
  position: z.number().optional(),
  iql: z.string().optional(),
  versionTypeValue: ProjectSchema.optional(),
});

export type ObjectTypeAttribute = z.infer<typeof ObjectTypeAttributeSchema>;
