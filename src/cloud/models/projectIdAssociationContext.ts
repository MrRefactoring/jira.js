import { z } from 'zod';
import { apiObject } from '#/core';
import { AssociationContextObjectSchema } from './associationContextObject';

export const ProjectIdAssociationContextSchema = apiObject(AssociationContextObjectSchema.shape).extend({
  identifier: z.number().optional(),
});

export type ProjectIdAssociationContext = z.infer<typeof ProjectIdAssociationContextSchema>;
