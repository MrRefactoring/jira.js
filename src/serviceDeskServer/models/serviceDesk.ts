import { z } from 'zod';
import { apiObject } from '#/core';
import { ServiceDeskLinkSchema } from './serviceDeskLink';

export const ServiceDeskSchema = apiObject({
  id: z.string().optional(),
  projectId: z.string().optional(),
  projectName: z.string().optional(),
  projectKey: z.string().optional(),
  _links: ServiceDeskLinkSchema.optional(),
});

export type ServiceDesk = z.infer<typeof ServiceDeskSchema>;
