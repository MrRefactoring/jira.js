import { z } from 'zod';
import { apiObject } from '#/core';

export const AssociateProjectsSchema = apiObject({
  idsOrKeys: z.array(z.string()).optional(),
});

export type AssociateProjects = z.infer<typeof AssociateProjectsSchema>;
