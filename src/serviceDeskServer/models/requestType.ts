import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { SelfLinkSchema } from './selfLink';
import { RequestTypeIconSchema } from './requestTypeIcon';

export const RequestTypeSchema = apiObject({
  id: z.string().optional(),
  _links: SelfLinkSchema.optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  helpText: z.string().optional(),
  serviceDeskId: z.string().optional(),
  groupIds: z.array(z.string()).optional(),
  icon: RequestTypeIconSchema.optional(),
  restrictionStatus: openEnum(['OPEN', 'RESTRICTED']).optional(),
});

export type RequestType = z.infer<typeof RequestTypeSchema>;
