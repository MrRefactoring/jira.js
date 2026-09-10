import type { z } from 'zod';
import { apiObject } from '#/core';
import { OrgModelSchema } from './orgModel';

export const OrgSchema = apiObject({
  data: OrgModelSchema.optional(),
});

export type Org = z.infer<typeof OrgSchema>;
