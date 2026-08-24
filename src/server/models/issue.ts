import { z } from 'zod';
import { apiObject } from '#/core';
import { ChangelogSchema } from './changelog';
import { EditMetaSchema } from './editMeta';
import { IncludedFieldsSchema } from './includedFields';
import { OpsbarSchema } from './opsbar';
import { PropertiesSchema } from './properties';
import { TransitionSchema } from './transition';

export const IssueSchema = apiObject({
  changelog: ChangelogSchema.optional(),
  editmeta: EditMetaSchema.optional(),
  fields: z.record(z.string(), z.any()).optional(),
  fieldsToInclude: IncludedFieldsSchema.optional(),
  id: z.string().optional(),
  key: z.string().optional(),
  names: z.record(z.string(), z.any()).optional(),
  operations: OpsbarSchema.optional(),
  properties: PropertiesSchema.optional(),
  renderedFields: z.record(z.string(), z.any()).nullish(),
  schema: z.record(z.string(), z.any()).optional(),
  self: z.url().optional(),
  transitionBeans: z.array(TransitionSchema).optional(),
  transitions: z.array(TransitionSchema).optional(),
  versionedRepresentations: z.record(z.string(), z.any()).optional(),
});

export type Issue = z.infer<typeof IssueSchema>;
