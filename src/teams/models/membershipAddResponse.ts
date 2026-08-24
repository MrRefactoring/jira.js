import { z } from 'zod';
import { apiObject } from '#/core';
import { MembershipCodedErrorSchema } from './membershipCodedError';
import { MembershipSchema } from './membership';

export const MembershipAddResponseSchema = apiObject({
  errors: z.array(MembershipCodedErrorSchema),
  members: z.array(MembershipSchema),
});

export type MembershipAddResponse = z.infer<typeof MembershipAddResponseSchema>;
