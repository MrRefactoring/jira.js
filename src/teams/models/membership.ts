import { z } from 'zod';
import { apiObject } from '#/core';

export const MembershipSchema = apiObject({
  accountId: z.string(),
});

export type Membership = z.infer<typeof MembershipSchema>;
