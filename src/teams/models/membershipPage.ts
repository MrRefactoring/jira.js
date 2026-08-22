import { z } from 'zod';
import { apiObject } from '#/core';
import { PageInfoSchema } from './pageInfo';
import { MembershipSchema } from './membership';

export const MembershipPageSchema = apiObject({
  pageInfo: PageInfoSchema,
  results: z.array(MembershipSchema),
});

export type MembershipPage = z.infer<typeof MembershipPageSchema>;
