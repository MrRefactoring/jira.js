import type { z } from 'zod';
import { apiObject } from '#/core';
import { DomainModelSchema } from './domainModel';

export const DomainSchema = apiObject({
  data: DomainModelSchema.optional(),
});

export type Domain = z.infer<typeof DomainSchema>;
