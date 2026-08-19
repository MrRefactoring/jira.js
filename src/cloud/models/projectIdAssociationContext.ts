import { z } from 'zod';
import { apiObject } from '#/core';
import { AssociationContextObjectSchema } from '../models';

export const ProjectIdAssociationContextSchema = apiObject(AssociationContextObjectSchema.shape).extend({
  identifier: z.number().optional(),
});

export type ProjectIdAssociationContext = z.infer<typeof ProjectIdAssociationContextSchema>;
