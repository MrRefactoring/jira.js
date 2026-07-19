import { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';

export const ServiceDeskSchema = apiObject({
  _links: SelfLinkSchema.optional(),
  /** ID of the service desk. */
  id: z.string().optional(),
  /** ID of the peer project for the service desk. */
  projectId: z.string().optional(),
  /** Key of the peer project of the service desk. */
  projectKey: z.string().optional(),
  /** Name of the project and service desk. */
  projectName: z.string().optional(),
  /** Key of the project type. */
  projectTypeKey: z.string().optional(),
});

export type ServiceDesk = z.infer<typeof ServiceDeskSchema>;
