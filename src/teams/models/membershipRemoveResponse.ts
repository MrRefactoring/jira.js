import { z } from 'zod';
import { apiObject } from '#/core';
import { MembershipCodedErrorSchema } from './membershipCodedError';

export const MembershipRemoveResponseSchema = apiObject({
  errors: z.array(MembershipCodedErrorSchema),
});

export type MembershipRemoveResponse = z.infer<typeof MembershipRemoveResponseSchema>;
