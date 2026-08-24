import { z } from 'zod';
import { apiObject } from '#/core';

export const MembershipCodedErrorSchema = apiObject({
  accountId: z.string(),
  code: z.string(),
  message: z.string(),
});

export type MembershipCodedError = z.infer<typeof MembershipCodedErrorSchema>;
