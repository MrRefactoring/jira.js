import { z } from 'zod';
import { apiObject } from '#/core';
import { MembershipSchema } from './membership';

export const MembershipRemovePayloadSchema = apiObject({
  members: z.array(MembershipSchema),
});

export type MembershipRemovePayload = z.infer<typeof MembershipRemovePayloadSchema>;
