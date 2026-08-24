import { z } from 'zod';
import { apiObject } from '#/core';
import { MembershipSchema } from './membership';

export const MembershipAddPayloadSchema = apiObject({
  members: z.array(MembershipSchema),
});

export type MembershipAddPayload = z.infer<typeof MembershipAddPayloadSchema>;
